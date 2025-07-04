<template>
  <v-app>
    <v-app-bar
      :color="THEME_COLORS.ink"
      density="comfortable"
      elevation="4"
    >
      <template #prepend>
        <v-app-bar-title class="app-toolbar-title star-wars-font px-6" :style="{ color: THEME_COLORS.primary }">
          <v-icon
            icon="mdi-star"
            class="mr-2"
            :color="THEME_COLORS.primary"
          />
          STAR WARS
        </v-app-bar-title>
      </template>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
        class="pa-4"
      >
        <!-- Filters -->
        <item-filter-component
          @sort-change="handleSortChange"
          @search-change="handleSearch"
          @type-change="handleTypeChange"
        />

        <!-- Items list -->
        <item-list-view
          :items="items"
          :is-loading="isLoading"
          :selected-type="selectedData"
        />

        <!-- Pagination -->
        <div
          v-if="pagesNumber > 1"
          class="d-flex justify-center mt-6"
        >
          <v-pagination
            v-model="currentPage"
            :length="pagesNumber"
            :active-color="THEME_COLORS.primary"
            rounded
            data-testid="pagination"
            :total-visible="7"
          />
        </div>
      </v-container>
    </v-main>

    <!-- Global Toast -->
    <toast-wrapper-component />
  </v-app>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import ItemFilterComponent from '@/presentation/components/ItemFilterComponent.vue';
import ItemListView from '@/presentation/components/ItemListView.vue';
import ToastWrapperComponent from '@/presentation/components/ToastWrapperComponent.vue';
import { useStoreManager } from '@/application/composables/useStoreManager.js';
import { THEME_COLORS } from '@/shared/constants/theme.const.js';

const currentPage = ref(1);
const pagesNumber = ref(1);

const { 
  items, 
  totalPages, 
  selectedData,
  isLoading,
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

<style scoped lang="scss">
@import '@/presentation/assets/style/variable';

.star-wars-font {
  @include star-wars-font;
}

.app-toolbar-title {
  font-size: $font-size-xxl !important;
}

.pagination-wrapper {
  @include flex-center;
  margin-top: $spacing-xl;
}
</style>
