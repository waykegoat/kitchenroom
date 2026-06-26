import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ConstructorViewMode } from '@/types/kitchen-types'

export const useEditorStore = defineStore('editor', () => {
  const viewMode = ref<ConstructorViewMode>('plan')
  const snapEnabled = ref(true)

  function setViewMode(mode: ConstructorViewMode): void {
    viewMode.value = mode
  }

  function toggleSnap(): void {
    snapEnabled.value = !snapEnabled.value
  }

  return { viewMode, snapEnabled, setViewMode, toggleSnap }
})
