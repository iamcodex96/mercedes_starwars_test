import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nextTick } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { useStoreManager } from '@/application/composables/useStoreManager.js';
import { DATA_TYPES, STORE_MANAGER_CONFIG } from '@/shared/constants/store.const.js';
import { usePeopleStore } from '@/application/stores/people.store.js';
import { usePlanetsStore } from '@/application/stores/planets.store.js';

vi.mock('@/application/stores/people.store.js');
vi.mock('@/application/stores/planets.store.js');

describe('useStoreManager', () => {
    let pinia;
    let mockPeopleStore;
    let mockPlanetsStore;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);

        // Setup store mocks
        mockPeopleStore = {
            fetchAllPeople: vi.fn(),
            paginatedPeople: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 1,
            setSearchTerm: vi.fn(),
            setSortDirection: vi.fn()
        };

        mockPlanetsStore = {
            fetchAllPlanets: vi.fn(),
            paginatedPlanets: [],
            totalItems: 0,
            totalPages: 0,
            currentPage: 1,
            setSearchTerm: vi.fn(),
            setSortDirection: vi.fn()
        };

        usePeopleStore.mockReturnValue(mockPeopleStore);
        usePlanetsStore.mockReturnValue(mockPlanetsStore);
    });

    describe('Initialization', () => {
        it('should initialize with default type', () => {
            const { selectedData } = useStoreManager();
            expect(selectedData.value).toBe(STORE_MANAGER_CONFIG.initialType);
        });

        it('should create store instances correctly', () => {
            useStoreManager();
            expect(usePeopleStore).toHaveBeenCalled();
            expect(usePlanetsStore).toHaveBeenCalled();
        });
    });

    describe('fetchData', () => {
        it('should call fetchAllPeople when selectedData is people', async () => {
            const { fetchData, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            await fetchData();

            expect(mockPeopleStore.fetchAllPeople).toHaveBeenCalled();
            expect(mockPlanetsStore.fetchAllPlanets).not.toHaveBeenCalled();
        });

        it('should call fetchAllPlanets when selectedData is not people', async () => {
            const { fetchData, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.planets;

            await fetchData();

            expect(mockPlanetsStore.fetchAllPlanets).toHaveBeenCalled();
            expect(mockPeopleStore.fetchAllPeople).not.toHaveBeenCalled();
        });
    });

    describe('computed properties', () => {
        describe('items', () => {
            it('should return paginatedPeople when selectedData is people', async () => {
                const testPeople = [{ name: 'Luke' }, { name: 'Leia' }];
                mockPeopleStore.paginatedPeople = testPeople;

                const { items, selectedData } = useStoreManager();
                selectedData.value = DATA_TYPES.people;

                await nextTick();
                expect(items.value).toEqual(testPeople);
            });

            it('should return paginatedPlanets when selectedData is not people', async () => {
                const testPlanets = [{ name: 'Tatooine' }, { name: 'Alderaan' }];
                mockPlanetsStore.paginatedPlanets = testPlanets;

                const { items, selectedData } = useStoreManager();
                selectedData.value = DATA_TYPES.planets;

                await nextTick();
                expect(items.value).toEqual(testPlanets);
            });
        });

        describe('totalItems', () => {
            it('should return totalItems from peopleStore when selectedData is people', async () => {
                mockPeopleStore.totalItems = 50;
                const { totalItems, selectedData } = useStoreManager();
                selectedData.value = DATA_TYPES.people;

                await nextTick();
                expect(totalItems.value).toBe(50);
            });

            it('should return totalItems from planetsStore when selectedData is not people', async () => {
                mockPlanetsStore.totalItems = 25;
                const { totalItems, selectedData } = useStoreManager();
                selectedData.value = DATA_TYPES.planets;

                await nextTick();
                expect(totalItems.value).toBe(25);
            });
        });

        describe('totalPages', () => {
            it('should return totalPages from peopleStore when selectedData is people', async () => {
                mockPeopleStore.totalPages = 5;
                const { totalPages, selectedData } = useStoreManager();
                selectedData.value = DATA_TYPES.people;

                await nextTick();
                expect(totalPages.value).toBe(5);
            });

            it('should return totalPages from planetsStore when selectedData is not people', async () => {
                mockPlanetsStore.totalPages = 3;
                const { totalPages, selectedData } = useStoreManager();
                selectedData.value = DATA_TYPES.planets;

                await nextTick();
                expect(totalPages.value).toBe(3);
            });
        });
    });

    describe('setSelectedData', () => {
        it('should change selectedData and call fetchData', async () => {
            const { setSelectedData, selectedData } = useStoreManager();

            await setSelectedData(DATA_TYPES.planets);

            expect(selectedData.value).toBe(DATA_TYPES.planets);
            expect(mockPlanetsStore.fetchAllPlanets).toHaveBeenCalled();
        });

        it('should switch from planets to people and fetch accordingly', async () => {
            const { setSelectedData, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.planets;

            await setSelectedData(DATA_TYPES.people);

            expect(selectedData.value).toBe(DATA_TYPES.people);
            expect(mockPeopleStore.fetchAllPeople).toHaveBeenCalled();
        });
    });

    describe('setCurrentPage', () => {
        it('should set currentPage on peopleStore when selectedData is people', () => {
            const { setCurrentPage, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            setCurrentPage(3);

            expect(mockPeopleStore.currentPage).toBe(3);
        });

        it('should set currentPage on planetsStore when selectedData is not people', () => {
            const { setCurrentPage, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.planets;

            setCurrentPage(2);

            expect(mockPlanetsStore.currentPage).toBe(2);
        });
    });

    describe('setSearchTerm', () => {
        it('should call setSearchTerm on peopleStore when selectedData is people', () => {
            const { setSearchTerm, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            setSearchTerm('Luke');

            expect(mockPeopleStore.setSearchTerm).toHaveBeenCalledWith('Luke');
            expect(mockPlanetsStore.setSearchTerm).not.toHaveBeenCalled();
        });

        it('should call setSearchTerm on planetsStore when selectedData is not people', () => {
            const { setSearchTerm, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.planets;

            setSearchTerm('Tatooine');

            expect(mockPlanetsStore.setSearchTerm).toHaveBeenCalledWith('Tatooine');
            expect(mockPeopleStore.setSearchTerm).not.toHaveBeenCalled();
        });
    });

    describe('setSortDirection', () => {
        it('should call setSortDirection on peopleStore when selectedData is people', () => {
            const { setSortDirection, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            setSortDirection('asc');

            expect(mockPeopleStore.setSortDirection).toHaveBeenCalledWith('asc');
            expect(mockPlanetsStore.setSortDirection).not.toHaveBeenCalled();
        });

        it('should call setSortDirection on planetsStore when selectedData is not people', () => {
            const { setSortDirection, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.planets;

            setSortDirection('desc');

            expect(mockPlanetsStore.setSortDirection).toHaveBeenCalledWith('desc');
            expect(mockPeopleStore.setSortDirection).not.toHaveBeenCalled();
        });
    });

    describe('Complete workflow', () => {
        it('should switch between types and maintain consistent state', async () => {
            const { setSelectedData, setSearchTerm, setCurrentPage, selectedData } = useStoreManager();

            // Start with people
            await setSelectedData(DATA_TYPES.people);
            setSearchTerm('Luke');
            setCurrentPage(2);

            expect(mockPeopleStore.setSearchTerm).toHaveBeenCalledWith('Luke');
            expect(mockPeopleStore.currentPage).toBe(2);

            // Switch to planets
            await setSelectedData(DATA_TYPES.planets);
            setSearchTerm('Alderaan');
            setCurrentPage(1);

            expect(selectedData.value).toBe(DATA_TYPES.planets);
            expect(mockPlanetsStore.setSearchTerm).toHaveBeenCalledWith('Alderaan');
            expect(mockPlanetsStore.currentPage).toBe(1);
        });

        it('should handle multiple configuration changes correctly', async () => {
            const { setSelectedData, setSortDirection, setSearchTerm } = useStoreManager();

            await setSelectedData(DATA_TYPES.people);
            setSortDirection('asc');
            setSearchTerm('Skywalker');

            expect(mockPeopleStore.setSortDirection).toHaveBeenCalledWith('asc');
            expect(mockPeopleStore.setSearchTerm).toHaveBeenCalledWith('Skywalker');

            await setSelectedData(DATA_TYPES.planets);
            setSortDirection('desc');
            setSearchTerm('Desert');

            expect(mockPlanetsStore.setSortDirection).toHaveBeenCalledWith('desc');
            expect(mockPlanetsStore.setSearchTerm).toHaveBeenCalledWith('Desert');
        });
    });

    describe('Edge cases', () => {
        it('should handle undefined or null values in setSearchTerm', () => {
            const { setSearchTerm, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            setSearchTerm(null);
            expect(mockPeopleStore.setSearchTerm).toHaveBeenCalledWith(null);

            setSearchTerm(undefined);
            expect(mockPeopleStore.setSearchTerm).toHaveBeenCalledWith(undefined);
        });

        it('should handle rapid selectedData changes', async () => {
            const { setSelectedData } = useStoreManager();

            await setSelectedData(DATA_TYPES.people);
            await setSelectedData(DATA_TYPES.planets);
            await setSelectedData(DATA_TYPES.people);

            expect(mockPeopleStore.fetchAllPeople).toHaveBeenCalledTimes(2);
            expect(mockPlanetsStore.fetchAllPlanets).toHaveBeenCalledTimes(1);
        });

        it('should handle invalid page numbers gracefully', () => {
            const { setCurrentPage, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            setCurrentPage(0);
            expect(mockPeopleStore.currentPage).toBe(0);

            setCurrentPage(-1);
            expect(mockPeopleStore.currentPage).toBe(-1);
        });

        it('should handle empty string search terms', () => {
            const { setSearchTerm, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            setSearchTerm('');
            expect(mockPeopleStore.setSearchTerm).toHaveBeenCalledWith('');
        });
    });

    describe('Reactive state updates', () => {
        it('should reflect totalItems changes immediately', async () => {
            const { totalItems, selectedData } = useStoreManager();
            selectedData.value = DATA_TYPES.people;

            mockPeopleStore.totalItems = 100;
            await nextTick();

            expect(totalItems.value).toBe(100);
        });
    });
});