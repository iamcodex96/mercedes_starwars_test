import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePeopleStore } from '@/application/stores/people.store.js'
import { mockPeopleApiResponse } from '@/test/mocks/peopleData.mock.js'

vi.mock('@/infrastructure/api/apiClient', () => ({
    default: {
        get: vi.fn()
    }
}));

vi.mock('@/shared/constants/starwars.const', () => ({
    STAR_WARS_CONFIG: {
        ENDPOINTS: {
            PEOPLE: '/people'
        },
        PAGE_SIZE: 10
    }
}));

import apiClient from '@/infrastructure/api/apiClient';

describe('People Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    })

    describe('initial state', () => {
        it('should have correct initial state', () => {
            const store = usePeopleStore();

            expect(store.currentPage).toBe(1);
            expect(store.isLoading).toBe(false);
            expect(store.error).toBe(null);
            expect(store.searchTerm).toBe('');
            expect(store.sortDirection).toBe('asc');
            expect(store.paginatedPeople).toEqual([]);
            expect(store.totalItems).toBe(0);
            expect(store.totalPages).toBe(0);
        });
    });

    describe('fetchAllPeople', () => {
        it('should fetch people successfully', async () => {
            const store = usePeopleStore();
            apiClient.get.mockResolvedValue({ data: mockPeopleApiResponse });

            await store.fetchAllPeople();

            expect(store.isLoading).toBe(false);
            expect(store.error).toBe(null);
            expect(store.totalItems).toBe(3);
            expect(apiClient.get).toHaveBeenCalledWith('/people');
        })

        it('should handle fetch error', async () => {
            const store = usePeopleStore();
            const errorMessage = 'Network error';
            apiClient.get.mockRejectedValue(new Error(errorMessage));

            await store.fetchAllPeople();

            expect(store.isLoading).toBe(false);
            expect(store.error).toBe('Error to load People. Please, Try again.');
            expect(store.totalItems).toBe(0);
        })

        it('should set loading state correctly', async () => {
            const store = usePeopleStore();
            apiClient.get.mockImplementation(() => {
                expect(store.isLoading).toBe(true);
                return Promise.resolve({ data: mockPeopleApiResponse });
            })

            await store.fetchAllPeople();

            expect(store.isLoading).toBe(false);
        })
    })

    describe('search functionality', () => {
        it('should filter people by search term', async () => {
            const store = usePeopleStore();
            apiClient.get.mockResolvedValue({ data: mockPeopleApiResponse });

            await store.fetchAllPeople();
            store.setSearchTerm('Luke');

            expect(store.totalItems).toBe(1);
            expect(store.paginatedPeople[0].name).toBe('Luke Skywalker');
            expect(store.currentPage).toBe(1);
        })

        it('should reset page when searching', () => {
            const store = usePeopleStore();
            store.currentPage = 3;

            store.setSearchTerm('test');

            expect(store.currentPage).toBe(1);
            expect(store.searchTerm).toBe('test');
        })
    })

    describe('sorting functionality', () => {
        it('should sort people in ascending order by default', async () => {
            const store = usePeopleStore();
            apiClient.get.mockResolvedValue({ data: mockPeopleApiResponse });

            await store.fetchAllPeople();

            const names = store.paginatedPeople.map(person => person.name);
            expect(names).toEqual(['C-3PO', 'Luke Skywalker', 'R2-D2']);
        });

        it('should sort people in descending order when set', async () => {
            const store = usePeopleStore();
            apiClient.get.mockResolvedValue({ data: mockPeopleApiResponse });

            await store.fetchAllPeople();
            store.setSortDirection('desc');

            const names = store.paginatedPeople.map(person => person.name);
            expect(names).toEqual(['R2-D2', 'Luke Skywalker', 'C-3PO']);
        });
    });
});
