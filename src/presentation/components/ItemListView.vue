<template>
  <div class="item-list-container">
    <!-- Loading state -->
    <div v-if="isLoading" class="d-flex justify-center align-center py-8">
      <v-progress-circular
        color="primary"
        size="50"
        indeterminate
      />
      <span class="ml-3 text-h6">Loading data...</span>
    </div>

    <!-- Empty state -->
    <div v-else-if="!items || items.length === 0" class="text-center py-8">
      <v-icon icon="mdi-database-search" size="64" color="grey" class="mb-4" />
      <h3 class="text-h5 mb-2">No results found</h3>
      <p class="text-body-1 text-grey">
        Try adjusting your search filters or changing the data type.
      </p>
    </div>

    <!-- Items grid -->
    <v-row v-else class="ma-0">
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <item-card-display
          :item="item"
          :selected-type="selectedType"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import ItemCardDisplay from '@/presentation/components/ItemCardDisplay.vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  selectedType: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.item-list-container {
  min-height: 400px;
}
</style>