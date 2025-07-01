import { computed, ref } from "vue";
import { DATA_TYPES, STORE_MANAGER_CONFIG } from "@/shared/constants/store.const.js";
import { usePeopleStore } from "@/application/stores/people.store.js";
import { usePlanetsStore } from "@/application/stores/planets.store.js";

export const useStoreManager = () => {
    const selectedData = ref(STORE_MANAGER_CONFIG.initialType);
    const peopleStore = usePeopleStore();
    const planetsStore = usePlanetsStore();

    const fetchData = async () => {
        if (selectedData.value === DATA_TYPES.people) {
            await peopleStore.fetchAllPeople();
        } else {
            await planetsStore.fetchAllPlanets();
        }
    }

    const items = computed(() => {
        return selectedData.value === DATA_TYPES.people
            ? peopleStore.paginatedPeople
            : planetsStore.paginatedPlanets;
    });

    const totalItems = computed(() => {
        return selectedData.value === DATA_TYPES.people
            ? peopleStore.totalItems
            : planetsStore.totalItems;
    });

    const totalPages = computed(() => {
        return selectedData.value === DATA_TYPES.people
            ? peopleStore.totalPages
            : planetsStore.totalPages;
    })

    const setSelectedData = async (type) => {
        selectedData.value = type;
        await fetchData();
    }

    const setCurrentPage = (page) => {
        if (selectedData.value === DATA_TYPES.people) {
            peopleStore.currentPage = page;
        } else {
            planetsStore.currentPage = page;
        }
    }

    const setSearchTerm = (term) => {
        if(selectedData.value === DATA_TYPES.people) {
            peopleStore.setSearchTerm(term);
        } else {
            planetsStore.setSearchTerm(term);
        }
    }

    const setSortDirection = (direction) => {
        if(selectedData.value === DATA_TYPES.people) {
            peopleStore.setSortDirection(direction);
        } else {
            planetsStore.setSortDirection(direction);
        }
    }

    return {
        // state
        selectedData,

        // computed
        items,
        totalItems,
        totalPages,

        // methods
        fetchData,
        setCurrentPage,
        setSelectedData,
        setSortDirection,
        setSearchTerm,
    }
}