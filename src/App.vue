<template>
  <v-app>
    <v-app-bar
        color="black"
        density="comfortable"
    >
      <template v-slot:prepend>
        <v-app-bar-title class="app-toolbar-title text-yellow-accent-4 star-wars-font px-6">
          STAR WARS
        </v-app-bar-title>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <item-filter-component
            @sort-change="handleSortChange"
            @search-change="handleSearch"
            @type-change="handleTypeChange"
        />
        <item-list-view
          :items="items"
        />
        <v-pagination
            v-model="currentPage"
            :length="pagesNumber"
            :active-color="THEME_COLORS.primary"
            rounded
            data-testid="pagination"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import ItemFilterComponent from '@/presentation/components/ItemFilterComponent.vue';
import ItemListView from '@/presentation/components/ItemListView.vue';
import { useStoreManager } from '@/application/composables/useStoreManager.js';
import {THEME_COLORS} from '@/shared/constants/theme.const.js';

const currentPage = ref(1);
const pagesNumber = ref(1);
const { 
  items, 
  totalPages, 
  fetchData, 
  setCurrentPage, 
  setSelectedData, 
  setSearchTerm, 
  setSortDirection 
} = useStoreManager();

watch(currentPage, (value) => {
  setCurrentPage(value);
});

watch(totalPages, (value) => {
  pagesNumber.value = value;
});

const handleSortChange = (direction) => {
  setSortDirection(direction);
}

const handleSearch = (searchTerm) => {
  setSearchTerm(searchTerm);
  currentPage.value = 1;
}

const handleTypeChange = (type) => {
  setSelectedData(type);
  currentPage.value = 1;
}

onMounted(async () => {
  await fetchData();
  pagesNumber.value = totalPages.value;
});
</script>
