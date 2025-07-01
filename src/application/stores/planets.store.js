
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiClient from '@/infrastructure/api/apiClient';
import { STAR_WARS_CONFIG } from '@/shared/constants/starwars.const';
import { Planet } from '@/domain/entities/Planet';

export const usePlanetsStore = defineStore('planets', () => {
    const allPlanets = ref([]);
    const currentPage = ref(1);
    const isLoading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const sortDirection = ref('asc');

    const filteredPlanets = computed(() => {
        return allPlanets.value.filter(planet =>
            planet.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
    });

    const totalItems = computed(() => filteredPlanets.value.length);

    const sortedPlanets = computed(() => {
        return [...filteredPlanets.value].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            const nameComparison = sortDirection.value === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);

            if (nameComparison === 0) {
                const dateA = new Date(a.created);
                const dateB = new Date(b.created);
                return sortDirection.value === 'asc'
                    ? dateA - dateB
                    : dateB - dateA;
            }

            return nameComparison;
        });
    });

    const paginatedPlanets = computed(() => {
        const start = (currentPage.value - 1) * STAR_WARS_CONFIG.PAGE_SIZE;
        const end = start + STAR_WARS_CONFIG.PAGE_SIZE;
        return sortedPlanets.value.slice(start, end);
    });


    const totalPages = computed(() =>
        Math.ceil(totalItems.value / STAR_WARS_CONFIG.PAGE_SIZE)
    );

    const fetchAllPlanets = async () => {
        try {
            isLoading.value = true;
            error.value = null;

            const response = await apiClient.get(STAR_WARS_CONFIG.ENDPOINTS.PLANETS);
            allPlanets.value = response.data.map(planet => Planet.mapApiData(planet));
        } catch (e) {
            error.value = 'Error al cargar los planetas. Por favor, inténtalo de nuevo.';
            console.error('Error en fetchAllPlanets:', e);
        } finally {
            isLoading.value = false;
        }
    };

    const setSearchTerm = (term) => {
        searchTerm.value = term;
        currentPage.value = 1;
    };

    const setSortDirection = (direction) => {
        sortDirection.value = direction;
    };

    return {
        // state
        currentPage,
        isLoading,
        error,
        searchTerm,
        sortDirection,

        // Getters
        sortedPlanets,
        paginatedPlanets,
        totalItems,
        totalPages,

        // Actions
        fetchAllPlanets,
        setSearchTerm,
        setSortDirection
    };
});