<template>
  <toast-component
    v-model="toastState.show"
    :type="toastState.type"
    :title="toastState.title"
    :message="toastState.message"
    :timeout="toastState.timeout"
    :persistent="toastState.persistent"
    @close="handleClose"
  />
</template>

<script setup>
import { toast } from '@/application/composables/useToast.js';
import ToastComponent from './ToastComponent.vue';

const { toastState } = toast;

const handleClose = () => {
  toast.hideToast();
}
</script>