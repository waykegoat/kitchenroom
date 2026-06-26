<script setup lang="ts">
import BaseModal from '@/components/common/BaseModal.vue'
import AuthForm from './AuthForm.vue'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <BaseModal :open="open" title="Аккаунт" @close="emit('close')">
    <AuthForm @success="emit('close')" />
  </BaseModal>
</template>
