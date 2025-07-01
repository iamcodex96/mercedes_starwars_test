<script setup>
  import { Person } from '@/domain/entities/Person.js';
  import {onMounted, ref} from 'vue';

  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })

  const isItemPerson = ref(props.item instanceof Person);

  onMounted(() => {
    console.log(props.item);
  })
</script>

<template>
  <v-card
      :class="[
        'ItemCardDisplay my-2',
      ]"
      role="listitem"
  >
    <v-card-title
        data-testid="item-name"
        class="text-h5 star-wars-font"
    >
      {{ item.name }}
    </v-card-title>

    <v-card-text>
      <div v-if="isItemPerson">
        <span> Height: {{ item.height }} </span>
        <span> Mass: {{ item.mass }} </span>
        <span> Gender: {{ item.gender }} </span>
        <span> Birth Year: {{ item.birthYear }} </span>
        <span> Skin Color: {{ item.skinColor }} </span>
      </div>
    </v-card-text>
  </v-card>
</template>