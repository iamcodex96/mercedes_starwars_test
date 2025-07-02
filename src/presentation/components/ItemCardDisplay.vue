<template>
  <v-card
      :class="[
      'item-card-display my-3 mx-1 d-flex flex-column',
      isItemPerson ? 'person-card' : 'planet-card'
    ]"
      :aria-label="item.name"
      role="listitem"
      tabindex="0"
      elevation="3"
      rounded="lg"
  >
    <v-card-title class="d-flex align-center pa-4 flex-shrink-0">
      <v-icon
          :icon="isItemPerson ? 'mdi-account-circle' : 'mdi-earth'"
          :color="isItemPerson ? THEME_COLORS.secondary : THEME_COLORS.success"
          size="large"
          class="mr-3"
      />
      <div>
        <h3
            class="text-h5 star-wars-font mb-1"
            data-testid="item-name"
        >
          {{ item.name }}
        </h3>
        <v-chip
            :color="isItemPerson ? THEME_COLORS.info : THEME_COLORS.success"
            size="small"
            variant="outlined"
        >
          {{ isItemPerson ? 'Character' : 'Planet' }}
        </v-chip>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-4 flex-grow-1 d-flex flex-column">
      <div
          v-if="isItemPerson"
          class="item-card-display__person-info flex-grow-1"
      >
        <v-row class="fill-height">
          <v-col
              cols="12"
              lg="6"
          >
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2" :style="{ color: THEME_COLORS.secondary }">
                <v-icon
                    icon="mdi-human"
                    size="small"
                    class="mr-1"
                    :color="THEME_COLORS.secondary"
                />
                Physical Characteristics
              </h4>
              <v-list
                  dense
                  class="pa-0"
              >
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-ruler"
                          size="small"
                          :color="THEME_COLORS.secondary"
                          class="mr-2"
                      />
                      <strong>Height:</strong>&nbsp;{{ formatHeight(item.height) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-weight"
                          size="small"
                          :color="THEME_COLORS.secondary"
                          class="mr-2"
                      />
                      <strong>Mass:</strong>&nbsp;{{ formatMass(item.mass) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-palette"
                          size="small"
                          :color="THEME_COLORS.secondary"
                          class="mr-2"
                      />
                      <strong>Skin Color:</strong>&nbsp;{{ formatText(item.skinColor) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col
              cols="12"
              lg="6"
          >
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2" :style="{ color: THEME_COLORS.secondary }">
                <v-icon
                    icon="mdi-information"
                    size="small"
                    class="mr-1"
                    :color="THEME_COLORS.secondary"
                />
                Personal Information
              </h4>
              <v-list
                  dense
                  class="pa-0"
              >
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-gender-male-female"
                          size="small"
                          :color="THEME_COLORS.secondary"
                          class="mr-2"
                      />
                      <strong>Gender:</strong>&nbsp;{{ formatGender(item.gender) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-calendar"
                          size="small"
                          :color="THEME_COLORS.secondary"
                          class="mr-2"
                      />
                      <strong>Birth Year:</strong>&nbsp;{{ formatBirthYear(item.birthYear) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
        </v-row>
      </div>

      <div
          v-else
          class="item-card-display__planet-info flex-grow-1"
      >
        <v-row class="fill-height">
          <v-col
              cols="12"
              lg="6"
          >
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2" :style="{ color: THEME_COLORS.success }">
                <v-icon
                    icon="mdi-earth"
                    size="small"
                    class="mr-1"
                    :color="THEME_COLORS.success"
                />
                Physical Characteristics
              </h4>
              <v-list
                  dense
                  class="pa-0"
              >
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-diameter-outline"
                          size="small"
                          :color="THEME_COLORS.success"
                          class="mr-2"
                      />
                      <strong>Diameter:</strong>&nbsp;{{ formatDiameter(item.diameter) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-weather-partly-cloudy"
                          size="small"
                          :color="THEME_COLORS.success"
                          class="mr-2"
                      />
                      <strong>Climate:</strong>&nbsp;{{ formatText(item.climate) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-gravity"
                          size="small"
                          :color="THEME_COLORS.success"
                          class="mr-2"
                      />
                      <strong>Gravity:</strong>&nbsp;{{ formatGravity(item.gravity) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col
              cols="12"
              lg="6"
          >
            <div class="info-section h-100">
              <h4 class="text-subtitle-1 font-weight-bold mb-2" :style="{ color: THEME_COLORS.success }">
                <v-icon
                    icon="mdi-chart-line"
                    size="small"
                    class="mr-1"
                    :color="THEME_COLORS.success"
                />
                Population Data
              </h4>
              <v-list
                  dense
                  class="pa-0"
              >
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-water"
                          size="small"
                          :color="THEME_COLORS.success"
                          class="mr-2"
                      />
                      <strong>Surface Water:</strong>&nbsp;{{ formatWater(item.surfaceWater) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-orbit"
                          size="small"
                          :color="THEME_COLORS.success"
                          class="mr-2"
                      />
                      <strong>Orbital Period:</strong>&nbsp;{{ formatOrbitalPeriod(item.orbitalPeriod) }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0 py-1">
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <v-icon
                          icon="mdi-account-group"
                          size="small"
                          :color="THEME_COLORS.success"
                          class="mr-2"
                      />
                      <strong>Population:</strong>&nbsp;{{ formatPopulation(item.population) }}
                    </div>
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
import { THEME_COLORS } from '@/shared/constants/theme.const.js'

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
.item-card-display {
  transition: all 0.3s ease;
  border: 1px solid rgb(0 0 0 / 10%);
  min-height: 350px;
  height: 100%;
}

.item-card-display:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgb(0 0 0 / 15%) !important;
}

.person-card {
  border-left: 4px solid v-bind('THEME_COLORS.secondary');
}

.planet-card {
  border-left: 4px solid v-bind('THEME_COLORS.success');
}

.info-section {
  background-color: rgb(0 0 0 / 2%);
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
  text-shadow: 2px 2px 4px rgb(0 0 0 / 30%);
  letter-spacing: 1px;
}

@media (width >= 600px) and (width <= 1023px) {
  .item-card-display {
    min-height: 300px;
  }
}

@media (width >= 1024px) {
  .item-card-display {
    min-height: 350px;
  }
}
</style>