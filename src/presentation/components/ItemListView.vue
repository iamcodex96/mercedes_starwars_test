<script setup>
  import ItemCardDisplay from '@/presentation/components/ItemCardDisplay.vue';
  defineProps({
    items: Array,
  })
</script>

<template>
  <item-card-display
      v-for="(item, index) in items"
      :key="index"
      :item="item"
  />
</template>