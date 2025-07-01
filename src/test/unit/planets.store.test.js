import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlanetsStore } from '@/application/stores/planets.store.js'
import { mockPlanetsApiResponse } from '@/test/mocks/planetsData.mock.js'

// Mock del apiClient
vi.mock('@/infrastructure/api/apiClient', () => ({
    default: {
        get: vi.fn()
    }
}))

// Mock de la constante
vi.mock('@/shared/constants/starwars.const', () => ({
    STAR_WARS_CONFIG: {
        ENDPOINTS: {
            PLANETS: '/planets'
        },
        PAGE_SIZE: 10
    }
}))

import apiClient from '@/infrastructure/api/apiClient'

describe('Planets Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.clearAllMocks();
    })

    describe('initial state', () => {
        it('should have correct initial state', () => {
            const store = usePlanetsStore();

            expect(store.currentPage).toBe(1);
            expect(store.isLoading).toBe(false);
            expect(store.error).toBe(null);
            expect(store.searchTerm).toBe('');
            expect(store.sortDirection).toBe('asc');
            expect(store.paginatedPlanets).toEqual([]);
            expect(store.totalItems).toBe(0);
            expect(store.totalPages).toBe(0);
        })
    })

    describe('fetchAllPlanets', () => {
        it('should fetch planets successfully', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets();

            expect(store.isLoading).toBe(false);
            expect(store.error).toBe(null);
            expect(store.totalItems).toBe(3);
            expect(apiClient.get).toHaveBeenCalledWith('/planets');
        })

        it('should handle fetch error', async () => {
            const store = usePlanetsStore();
            const errorMessage = 'Network error';
            apiClient.get.mockRejectedValue(new Error(errorMessage));

            await store.fetchAllPlanets();

            expect(store.isLoading).toBe(false);
            expect(store.error).toBe('Error al cargar los planetas. Por favor, inténtalo de nuevo.');
            expect(store.totalItems).toBe(0);
        });

        it('should set loading state correctly', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockImplementation(() => {
                expect(store.isLoading).toBe(true);
                return Promise.resolve({ data: mockPlanetsApiResponse });
            });

            await store.fetchAllPlanets();

            expect(store.isLoading).toBe(false);
        })
    })

    describe('search functionality', () => {
        it('should filter planets by search term (case insensitive)', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets();
            store.setSearchTerm('tatooine');

            expect(store.totalItems).toBe(1);
            expect(store.paginatedPlanets[0].name).toBe('Tatooine');
            expect(store.currentPage).toBe(1);
        })

        it('should filter planets with partial match', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets();
            store.setSearchTerm('ald');

            expect(store.totalItems).toBe(1);
            expect(store.paginatedPlanets[0].name).toBe('Alderaan');
        })

        it('should return empty array when no matches found', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets();
            store.setSearchTerm('nonexistent');

            expect(store.totalItems).toBe(0);
            expect(store.paginatedPlanets).toEqual([]);
        })

        it('should reset page when searching', () => {
            const store = usePlanetsStore();
            store.currentPage = 3;

            store.setSearchTerm('test');

            expect(store.currentPage).toBe(1);
            expect(store.searchTerm).toBe('test');
        })
    })

    describe('sorting functionality', () => {
        it('should sort planets in ascending order by default', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets()

            const names = store.paginatedPlanets.map(planet => planet.name)
            expect(names).toEqual(['Alderaan', 'Tatooine', 'Yavin IV']);
        })

        it('should sort planets in descending order when set', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets();
            store.setSortDirection('desc');

            const names = store.paginatedPlanets.map(planet => planet.name);
            expect(names).toEqual(['Yavin IV', 'Tatooine', 'Alderaan']);
        })
    });

    describe('pagination', () => {
        it('should calculate total pages correctly', async () => {
            const store = usePlanetsStore();
            // Mock 25 planets to test pagination
            const manyPlanets = Array.from({ length: 25 }, (_, index) => ({
                ...mockPlanetsApiResponse[0],
                name: `Planet ${index + 1}`,
                url: `https://swapi.dev/api/planets/${index + 1}/`
            }));
            apiClient.get.mockResolvedValue({ data: manyPlanets });

            await store.fetchAllPlanets();

            expect(store.totalItems).toBe(25);
            expect(store.totalPages).toBe(3); // 25 items / 10 per page = 3 pages
        })

        it('should return correct items for different pages', async () => {
            const store = usePlanetsStore();
            const manyPlanets = Array.from({ length: 15 }, (_, index) => ({
                ...mockPlanetsApiResponse[0],
                name: `Planet ${String(index + 1).padStart(2, '0')}`, // For consistent sorting
                url: `https://swapi.dev/api/planets/${index + 1}/`
            }));
            apiClient.get.mockResolvedValue({ data: manyPlanets });

            await store.fetchAllPlanets();

            // Page 1
            store.currentPage = 1;
            expect(store.paginatedPlanets).toHaveLength(10);
            expect(store.paginatedPlanets[0].name).toBe('Planet 01');

            // Page 2
            store.currentPage = 2;
            expect(store.paginatedPlanets).toHaveLength(5);
            expect(store.paginatedPlanets[0].name).toBe('Planet 11');
        })
    })

    describe('computed properties integration', () => {
        it('should work with search and sort together', async () => {
            const store = usePlanetsStore();
            apiClient.get.mockResolvedValue({ data: mockPlanetsApiResponse });

            await store.fetchAllPlanets();

            // Search for planets with 'a' in name and sort descending
            store.setSearchTerm('a');
            store.setSortDirection('desc');

            const filteredNames = store.paginatedPlanets.map(planet => planet.name);
            expect(filteredNames).toEqual(['Yavin IV', 'Tatooine', 'Alderaan']);
        })

        it('should update pagination when filtering', async () => {
            const store = usePlanetsStore();
            const manyPlanets = Array.from({ length: 25 }, (_, index) => ({
                ...mockPlanetsApiResponse[0],
                name: index < 5 ? `Special Planet ${index + 1}` : `Regular Planet ${index + 1}`,
                url: `https://swapi.dev/api/planets/${index + 1}/`
            }))
            apiClient.get.mockResolvedValue({ data: manyPlanets });

            await store.fetchAllPlanets();

            // Initially should have 3 pages
            expect(store.totalPages).toBe(3);

            // Filter to only special planets
            store.setSearchTerm('Special');

            // Now should have only 1 page
            expect(store.totalItems).toBe(5);
            expect(store.totalPages).toBe(1);
        });
    });
});