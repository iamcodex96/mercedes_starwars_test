<template>
  <v-card
      :class="[
        'ItemCardDisplay my-3 mx-1 d-flex flex-column',
        isItemPerson ? 'person-card' : 'planet-card'
      ]"
      :aria-label="item.name"
      role="listitem"
      tabindex="0"
      elevation="3"
      rounded="lg"
  >
    <!-- Header with icon and name -->
    <v-card-title class="d-flex align-center pa-4 flex-shrink-0">
      <v-icon 
        :icon="isItemPerson ? 'mdi-account-circle' : 'mdi-earth'" 
        :color="isItemPerson ? 'blue' : 'green'"
        size="large"
        class="mr-3"
      />
      <div>
        <h3 class="text-h5 star-wars-font mb-1" data-testid="item-name">
          {{ item.name }}
        </h3>
        <v-chip 
          :color="isItemPerson ? 'blue' : 'green'" 
          size="small" 
          variant="outlined"
        >
          {{ isItemPerson ? 'Character' : 'Planet' }}
        </v-chip>
      </div>
    </v-card-title>

    <v-divider />

    <!-- Content area that fills remaining space -->
    <v-card-text class="pa-4 flex-grow-1 d-flex flex-column">
      <!-- Person Information -->
      <div v-if="isItemPerson" class="ItemCardDisplay__PersonInfo flex-grow-1">
        <v-row class="fill-height">
          <v-col cols="12" lg="6">
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2 text-blue">
                <v-icon icon="mdi-human" size="small" class="mr-1" />
                Physical Characteristics
              </h4>
              <v-list dense class="pa-0">
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-ruler" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Height:</strong> {{ formatHeight(item.height) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-weight" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Mass:</strong> {{ formatMass(item.mass) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-palette" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Skin Color:</strong> {{ formatText(item.skinColor) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2 text-blue">
                <v-icon icon="mdi-information" size="small" class="mr-1" />
                Personal Information
              </h4>
              <v-list dense class="pa-0">
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-gender-male-female" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Gender:</strong> {{ formatGender(item.gender) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-calendar" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Birth Year:</strong> {{ formatBirthYear(item.birthYear) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Planet Information -->
      <div v-else class="ItemCardDisplay__PlanetInfo flex-grow-1">
        <v-row class="fill-height">
          <v-col cols="12" lg="6">
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2 text-green">
                <v-icon icon="mdi-earth" size="small" class="mr-1" />
                Physical Characteristics
              </h4>
              <v-list dense class="pa-0">
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-diameter-outline" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Diameter:</strong> {{ formatDiameter(item.diameter) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-weather-partly-cloudy" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Climate:</strong> {{ formatText(item.climate) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-gravity" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Gravity:</strong> {{ formatGravity(item.gravity) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2 text-green">
                <v-icon icon="mdi-chart-line" size="small" class="mr-1" />
                Population Data
              </h4>
              <v-list dense class="pa-0">
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-water" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Surface Water:</strong> {{ formatWater(item.surfaceWater) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-orbit" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Orbital Period:</strong> {{ formatOrbitalPeriod(item.orbitalPeriod) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-account-group" size="small" color="grey" />
                  </template>
                  <v-list-item-title>
                    <strong>Population:</strong> {{ formatPopulation(item.population) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { DATA_TYPES } from '@/shared/constants/store.const.js'

const props = defineProps({
  item: Object,
  selectedType: {
    type: String,
    default: DATA_TYPES.people
  }
})

const isItemPerson = computed(() => {
  return props.selectedType === DATA_TYPES.people || props.item.gender !== undefined
})

const formatHeight = (height) => {
  if (!height || height === 'unknown') return 'Unknown'
  return `${height} cm`
}

const formatMass = (mass) => {
  if (!mass || mass === 'unknown') return 'Unknown'
  return `${mass} kg`
}

const formatGender = (gender) => {
  const genders = {
    'male': 'Male',
    'female': 'Female',
    'hermaphrodite': 'Hermaphrodite',
    'n/a': 'N/A'
  };
  return genders[gender] || 'Unknown';
}

const formatBirthYear = (birthYear) => {
  if (!birthYear || birthYear === 'unknown') {
    return 'Unknown';
  }
  return birthYear;
}

const formatDiameter = (diameter) => {
  if (!diameter || diameter === 'unknown') {
    return 'Unknown';
  }
  return `${Number(diameter).toLocaleString()} km`;
}

const formatGravity = (gravity) => {
  if (!gravity || gravity === 'unknown') {
    return 'Unknown';
  }
  return gravity.includes('gravity') ? gravity : `${gravity} (standard gravity)`;
}

const formatWater = (water) => {
  if (!water || water === 'unknown') {
    return 'Unknown';
  }

  return `${water}%`;
}

const formatOrbitalPeriod = (period) => {
  if (!period || period === 'unknown') {
    return 'Unknown';
  }
  return `${period} days`
}

const formatPopulation = (population) => {
  if (!population || population === 'unknown') {
    return 'Unknown';
  }
  const num = Number(population);
  if (isNaN(num)) {
    return population;
  }
  return num.toLocaleString()
}

const formatText = (text) => {
  if (!text || text === 'unknown') {
    return 'Unknown';
  }
  return text.charAt(0).toUpperCase() + text.slice(1)
}
</script>

<style scoped>
.ItemCardDisplay {
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.1);
  min-height: 350px;
  height: 100%;
}

.ItemCardDisplay:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.person-card {
  border-left: 4px solid #2196F3;
}

.planet-card {
  border-left: 4px solid #4CAF50;
}

.info-section {
  background-color: rgba(0,0,0,0.02);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.v-list-item {
  min-height: 32px;
}

.v-list-item-title {
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: normal;
  word-wrap: break-word;
}

.star-wars-font {
  font-family: 'Arial Black', Arial, sans-serif;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.fill-height {
  height: 100%;
}

.h-100 {
  height: 100% !important;
}

@media (max-width: 1280px) and (min-width: 960px) {
  .ItemCardDisplay {
    min-height: 380px;
  }
  
  .info-section {
    padding: 8px;
  }
  
  .v-list-item-title {
    font-size: 0.8rem;
  }
  
  .text-subtitle-1 {
    font-size: 0.9rem !important;
  }
}

@media (max-width: 960px) {
  .ItemCardDisplay {
    min-height: auto;
  }
  
  .info-section {
    margin-bottom: 8px;
  }
}
</style>