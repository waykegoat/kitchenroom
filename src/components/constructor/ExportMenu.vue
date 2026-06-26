<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/project-store'
import { usePlanExport } from '@/composables/use-plan-export'
import BaseButton from '@/components/common/BaseButton.vue'

const projectStore = useProjectStore()
const { currentName } = storeToRefs(projectStore)
const { exportPlanPng, exportPlanPdf } = usePlanExport()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function toggle(): void {
  open.value = !open.value
}

function onPng(): void {
  open.value = false
  void exportPlanPng(`${currentName.value || 'kitchen'}.png`)
}

function onPdf(): void {
  open.value = false
  exportPlanPdf()
}

function onOutsideClick(event: MouseEvent): void {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('click', onOutsideClick))
onBeforeUnmount(() => document.removeEventListener('click', onOutsideClick))
</script>

<template>
  <div ref="root" class="export-menu">
    <BaseButton size="sm" variant="outline" @click="toggle">Экспорт</BaseButton>
    <div v-if="open" class="export-menu__dropdown">
      <button class="export-menu__item" @click="onPng">Изображение (PNG)</button>
      <button class="export-menu__item" @click="onPdf">Печать / PDF</button>
    </div>
  </div>
</template>

<style scoped>
.export-menu {
  position: relative;
}

.export-menu__dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 20;
  min-width: 180px;
  padding: var(--space-1);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-md);
}

.export-menu__item {
  display: block;
  width: 100%;
  padding: 9px 12px;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-ink-soft);
  border-radius: 4px;
}

.export-menu__item:hover {
  background-color: var(--color-surface-muted);
  color: var(--color-ink);
}
</style>
