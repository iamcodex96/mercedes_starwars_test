import { reactive, ref, computed, watch } from 'vue'
import { usePeopleStore } from '@/application/stores/people.store.js'
import { usePlanetsStore } from '@/application/stores/planets.store.js'
import { DATA_TYPES, STORE_MANAGER_CONFIG } from "@/shared/constants/store.const.js"
import { toast } from './useToast.js'

export function useStoreManager() {
  const config = reactive({ ...STORE_MANAGER_CONFIG })
  const peopleStore = usePeopleStore()
  const planetsStore = usePlanetsStore()
  
  const selectedData = ref(DATA_TYPES.people)
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  const currentStore = computed(() => {
    return selectedData.value === DATA_TYPES.people ? peopleStore : planetsStore
  })

  const items = computed(() => {
    if (selectedData.value === DATA_TYPES.people) {
      return peopleStore.paginatedPeople || []
    } else {
      return planetsStore.paginatedPlanets || []
    }
  })

  const currentPage = computed(() => currentStore.value.currentPage || 1)
  const totalPages = computed(() => currentStore.value.totalPages || 1)
  const totalItems = computed(() => currentStore.value.totalItems || 0)
  const searchTerm = computed(() => currentStore.value.searchTerm || '')
  const sortDirection = computed(() => currentStore.value.sortDirection || 'asc')

  const showToast = (type, title, message) => {
    if (window.showToast) {
      window.showToast[type](message, title)
    }
  }

  const fetchData = async () => {
    try {
      isLoading.value = true
      hasError.value = false
      errorMessage.value = ''
      
      let result
      
      if (selectedData.value === DATA_TYPES.people) {
        result = await peopleStore.fetchAllPeople()
      } else {
        result = await planetsStore.fetchAllPlanets()
      }
      
      if (result && result.success !== false) {
        const dataType = selectedData.value === DATA_TYPES.people ? 'characters' : 'planets'
        showToast('showSuccess', 'Data Loaded', `Successfully loaded ${items.value.length} ${dataType}!`)
      } else {
        throw new Error(result?.error || 'Failed to fetch data')
      }
      
    } catch (error) {
      console.error('Error fetching data:', error)
      hasError.value = true
      errorMessage.value = error.message || 'An unexpected error occurred'
      showToast('showError', 'Failed to Load Data', errorMessage.value)
    } finally {
      isLoading.value = false
    }
  }

  const setCurrentPage = async (page) => {
    try {
      currentStore.value.currentPage = page
      await fetchData()
    } catch (error) {
      showToast('showError', 'Navigation Error', 'Failed to load page data')
    }
  }

  const setSelectedData = async (dataType) => {
    try {
      selectedData.value = dataType
      await fetchData()
    } catch (error) {
      showToast('showError', 'Data Switch Error', 'Failed to switch data type')
    }
  }

  const setSearchTerm = async (term) => {
    try {
      currentStore.value.setSearchTerm(term)
      await fetchData()
    } catch (error) {
      showToast('showError', 'Search Error', 'Failed to perform search')
    }
  }

  const setSortDirection = async (direction) => {
    try {
      currentStore.value.setSortDirection(direction)
      await fetchData()
      
      const sortText = direction === 'asc' ? 'A-Z' : 'Z-A'
      showToast('showInfo', 'Sorting Applied', `Data sorted ${sortText}`)
    } catch (error) {
      showToast('showError', 'Sort Error', 'Failed to sort data')
    }
  }

  // Watch for store errors
  watch([() => peopleStore.error, () => planetsStore.error], ([peopleError, planetsError]) => {
    const error = peopleError || planetsError
    if (error) {
      showToast('showError', 'Store Error', error)
    }
  })

  return {
    // State
    items,
    currentPage,
    totalPages,
    totalItems,
    searchTerm,
    sortDirection,
    selectedData,
    isLoading,
    hasError,
    errorMessage,
    
    // Actions
    fetchData,
    setCurrentPage,
    setSelectedData,
    setSearchTerm,
    setSortDirection
  }
}