<template>
  <v-snackbar
    v-model="showToast"
    :color="toastColor"
    :timeout="toastTimeout"
    location="top right"
    variant="elevated"
    :multi-line="isMultiLine"
    :vertical="isVertical"
  >
    <div class="d-flex align-center">
      <v-icon 
        :icon="toastIcon" 
        size="small" 
        class="mr-2"
      />
      <div class="toast-content">
        <div
          v-if="toastTitle"
          class="toast-title"
        >
          {{ toastTitle }}
        </div>
        <div class="toast-message">
          {{ toastMessage }}
        </div>
      </div>
    </div>
    
    <template #actions>
      <v-btn
        color="white"
        variant="text"
        size="small"
        @click="hideToast"
      >
        <v-icon icon="mdi-close" />
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  timeout: {
    type: Number,
    default: 5000
  },
  persistent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const showToast = ref(props.modelValue)

const toastConfig = {
  success: {
    color: 'success',
    icon: 'mdi-check-circle',
    timeout: 4000
  },
  error: {
    color: 'error',
    icon: 'mdi-alert-circle',
    timeout: 6000
  },
  warning: {
    color: 'warning',
    icon: 'mdi-alert',
    timeout: 5000
  },
  info: {
    color: 'info',
    icon: 'mdi-information',
    timeout: 4000
  }
}

const toastColor = computed(() => toastConfig[props.type]?.color || 'info')
const toastIcon = computed(() => toastConfig[props.type]?.icon || 'mdi-information')
const toastTimeout = computed(() => {
  if (props.persistent) return -1
  return props.timeout || toastConfig[props.type]?.timeout || 4000
})
const toastTitle = computed(() => props.title)
const toastMessage = computed(() => props.message)
const isMultiLine = computed(() => props.message.length > 50 || props.title.length > 0)
const isVertical = computed(() => props.title.length > 0)

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  showToast.value = newValue
})

watch(showToast, (newValue) => {
  emit('update:modelValue', newValue)
  if (!newValue) {
    emit('close')
  }
})

const hideToast = () => {
  showToast.value = false
}

defineExpose({
  show: () => { showToast.value = true },
  hide: hideToast
})
</script>

<style scoped lang="scss">
@import '@/presentation/assets/style/variable';

.toast-wrapper {
  display: flex;
  align-items: center;

  .toast-icon {
    margin-right: 0.5rem;
  }
}

.toast-content {
  flex: 1;

  .toast-title {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 2px;
  }

  .toast-message {
    font-size: 0.875rem;
    line-height: 1.3;
  }
}

:deep(.v-snackbar__content) {
  padding: 16px 24px;
}

:deep(.v-snackbar__actions) {
  padding: 8px 16px 16px;
}
</style>
