<template>
  <div class="w-100 d-flex justify-center my-4">
    <v-btn-toggle
      v-model="selectedData"
      mandatory
      color="primary"
      rounded="lg"
      @update:model-value="handleChangeType"
    >
      <v-btn
        :value="DATA_TYPES.people"
        data-testid="people-button"
      >
        <v-icon start> mdi-account </v-icon>
        People
      </v-btn>
      <v-btn
        :value="DATA_TYPES.planet"
        data-testid="planets-button"
      >
        <v-icon start>mdi-earth</v-icon>
        Planets
      </v-btn>
    </v-btn-toggle>
  </div>
  <div class="d-flex">
    <v-text-field
      v-model="searchTerm"
      :label="searchLabel"
      :color="THEME_COLORS.primary"
      variant="outlined"
      rounded="xl"
      data-testid="search-input"
      class="mr-4"
      @update:model-value="onSearch"
    />
    <v-btn
      :color="isSortAsc ? THEME_COLORS.primary : THEME_COLORS.ink"
      rounded="xl"
      size="large"
      glow
      data-testid="sort-button"
      class="mt-2"
      @click="changeSortDirection"
    >
      <v-icon v-if="isSortAsc">mdi-sort-ascending</v-icon>
      <v-icon v-else>mdi-sort-descending</v-icon>
    </v-btn>
  </div>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue';
import { THEME_COLORS } from '@/shared/constants/theme.const.js';
import { DATA_TYPES } from '@/shared/constants/store.const.js';
import { useStoreManager } from "@/application/composables/useStoreManager.js";

const emit = defineEmits(['sort-change', 'search-change', 'type-change']);
const { selectedData } = useStoreManager();
const searchLabel = computed(() => (`Search ${selectedData.value} by name...`));
const searchTerm = ref('');
const sortDirection = ref('asc');
const isSortAsc = ref(true);

const onSearch = (searchTerm) => {
  emit('search-change', searchTerm);
}

const changeSortDirection = () => {
  isSortAsc.value = !isSortAsc.value;
  sortDirection.value = isSortAsc.value ? 'asc' : 'desc';
  emit('sort-change', sortDirection.value);
}

const handleChangeType = (type) => {
  emit('type-change', type);
}
</script>