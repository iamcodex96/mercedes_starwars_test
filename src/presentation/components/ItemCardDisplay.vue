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
import {
  formatDiameter,
  formatGravity,
  formatHeight,
  formatMass,
  formatText,
  formatWater,
  formatOrbitalPeriod,
  formatPopulation,
  formatGender,
  formatBirthYear,
} from '@/shared/utils/entityDataFormater.util.js';

const props = defineProps({
  item: Object,
  selectedType: {
    type: String,
    default: DATA_TYPES.people
  }
});

const isItemPerson = computed(() => {
  return props.selectedType === DATA_TYPES.people || props.item.gender !== undefined;
});
</script>

<style scoped lang="scss">
@import '@/presentation/assets/style/variable';

.item-card-display {
  @include card-hover;
  border: $shadow-subtle;
  min-height: 350px;
  height: 100%;

  &__person-info,
  &__planet-info {
    .info-section {
      background-color: rgb(0 0 0 / 2%);
      border-radius: $border-radius-md;
      padding: $spacing-md;
      margin-bottom: $spacing-md;
      display: flex;
      flex-direction: column;
    }
  }
}

.person-card {
  border-left: 4px solid $secondary;
}

.planet-card {
  border-left: 4px solid $success;
}

.section-title {
  @extend .text-subtitle-1 !optional;
  @extend .font-weight-bold !optional;
  @extend .mb-2 !optional;
}

.info-item {
  @extend .px-0 !optional;
  @extend .py-1 !optional;
  min-height: 32px;

  .v-list-item-title {
    font-size: $font-size-sm;
    line-height: $line-height-normal;
    white-space: normal;
    word-wrap: break-word;
  }
}

.info-row {
  @include flex-center;
  justify-content: flex-start;

  .info-icon {
    margin-right: $spacing-sm;
  }
}

.star-wars-font {
  @include star-wars-font;
}

// Breakpoints usando las variables
@include media-between($breakpoint-sm, $breakpoint-lg) {
  .item-card-display {
    min-height: 300px;
  }
}

@include media-up($breakpoint-lg) {
  .item-card-display {
    min-height: 350px;
  }
}
</style>
