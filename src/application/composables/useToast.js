import { ref, reactive } from 'vue'

const toastState = reactive({
  show: false,
  type: 'info',
  title: '',
  message: '',
  timeout: 5000,
  persistent: false
})

export function useToast() {
  const showToast = (options) => {
    toastState.show = false
    
    Object.assign(toastState, {
      show: true,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message || '',
      timeout: options.timeout || getDefaultTimeout(options.type),
      persistent: options.persistent || false
    })
  }

  const hideToast = () => {
    toastState.show = false
  }

  const showSuccess = (message, options = {}) => {
    showToast({
      type: 'success',
      message,
      title: options.title || 'Success',
      ...options
    })
  }

  const showError = (message, options = {}) => {
    showToast({
      type: 'error',
      message,
      title: options.title || 'Error',
      timeout: 6000,
      ...options
    })
  }

  const showWarning = (message, options = {}) => {
    showToast({
      type: 'warning',
      message,
      title: options.title || 'Warning',
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    showToast({
      type: 'info',
      message,
      title: options.title || 'Info',
      ...options
    })
  }

  const showLoading = (message = 'Loading data...') => {
    showToast({
      type: 'info',
      message,
      title: '',
      persistent: true
    })
  }

  return {
    // State
    toastState,
    
    // Methods
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading
  }
}

function getDefaultTimeout(type) {
  const timeouts = {
    success: 4000,
    error: 6000,
    warning: 5000,
    info: 4000
  }
  return timeouts[type] || 4000
}

export const toast = useToast()