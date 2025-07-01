<template>
  <div class="w-100 d-flex justify-center my-4">
    <v-btn-toggle
        v-model="selectedType"
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
        :label="`Search Planets`"
        :color="THEME_COLORS.primary"
        variant="outlined"
        rounded="xl"
        data-testid="search-input"
        @update:model-value="onSearch"
    />
    <v-btn
        :color="isSortAsc ? THEME_COLORS.primary : THEME_COLORS.ink"
        rounded="xl"
        size="large"
        glow
        data-testid="sort-button"
        @click="changeSortDirection"
        class="mt-2"
    >
      <v-icon v-if="isSortAsc">mdi-sort-ascending</v-icon>
      <v-icon v-else>mdi-sort-descending</v-icon>
    </v-btn>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { THEME_COLORS } from '@/shared/constants/theme.const.js';
import { DATA_TYPES } from '@/shared/constants/store.const.js';

const emit = defineEmits(['sort-change', 'search-change', 'type-change']);
const searchTerm = ref('');
const sortDirection = ref('asc');
const isSortAsc = ref(true);
const selectedType = ref(DATA_TYPES.people);

const onSearch = (searchTerm) => {
  emit('search-change', searchTerm);
}

const changeSortDirection = () => {
  isSortAsc.value = !isSortAsc.value;
  sortDirection.value = isSortAsc.value ? 'asc' : 'desc';
  emit('sort-change', sortDirection.value);
}

const handleChangeType = (type) => {
  selectedType.value = type;
  emit('type-change', selectedType.value);
}
</script>