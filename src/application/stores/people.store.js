
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiClient from '@/infrastructure/api/apiClient';
import { STAR_WARS_CONFIG } from '@/shared/constants/starwars.const';
import { Person } from '@/domain/entities/Person.js';

export const usePeopleStore = defineStore('people', () => {
    const allPeople = ref([]);
    const currentPage = ref(1);
    const isLoading = ref(false);
    const error = ref(null);
    const searchTerm = ref('');
    const sortDirection = ref('asc');

    const filteredPeople = computed(() => {
        return allPeople.value.filter(person => person.name.includes(searchTerm.value));
    });

    const totalItems = computed(() => filteredPeople.value.length);

    const sortedPeople = computed(() => {
        return [...filteredPeople.value].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            const nameComparison = sortDirection.value === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);

            if (nameComparison === 0) {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortDirection.value === 'asc'
                    ? dateA - dateB
                    : dateB - dateA;
            }

            return nameComparison;
        });
    });

    const paginatedPeople = computed(() => {
        const start = (currentPage.value - 1) * STAR_WARS_CONFIG.PAGE_SIZE;
        const end = start + STAR_WARS_CONFIG.PAGE_SIZE;
        return sortedPeople.value.slice(start, end);
    });


    const totalPages = computed(() =>
        Math.ceil(totalItems.value / STAR_WARS_CONFIG.PAGE_SIZE)
    );

    const fetchAllPeople = async () => {
        try {
            isLoading.value = true;
            error.value = null;

            const response = await apiClient.get(STAR_WARS_CONFIG.ENDPOINTS.PEOPLE);
            allPeople.value = response.data.map(person => (Person.mapApiData(person)));
        } catch (e) {
            error.value = 'Error to load People. Please, Try again.';
            console.error('Error en fetchAllPeople:', e);
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
        // Estado
        currentPage,
        isLoading,
        error,
        searchTerm,
        sortDirection,

        // Getters computados
        paginatedPeople,
        totalItems,
        totalPages,

        // Acciones
        fetchAllPeople,
        setSearchTerm,
        setSortDirection
    };
});