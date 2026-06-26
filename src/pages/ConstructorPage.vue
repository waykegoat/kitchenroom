<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFurnitureStore } from '@/stores/furniture-store'
import { useRoomStore } from '@/stores/room-store'
import { useProjectStore } from '@/stores/project-store'
import { useHistoryStore } from '@/stores/history-store'
import ConstructorToolbar from '@/components/constructor/ConstructorToolbar.vue'
import CatalogPanel from '@/components/constructor/CatalogPanel.vue'
import ConstructorCanvas from '@/components/constructor/ConstructorCanvas.vue'
import InspectorSidebar from '@/components/constructor/InspectorSidebar.vue'
import ProjectManagerDialog from '@/components/constructor/ProjectManagerDialog.vue'
import ExportDocument from '@/components/constructor/ExportDocument.vue'

const furnitureStore = useFurnitureStore()
const roomStore = useRoomStore()
const projectStore = useProjectStore()
const historyStore = useHistoryStore()
const { items } = storeToRefs(furnitureStore)
const { dimensions } = storeToRefs(roomStore)

const projectsOpen = ref(false)
const catalogOpen = ref(false)
const inspectorOpen = ref(false)

function closePanels(): void {
  catalogOpen.value = false
  inspectorOpen.value = false
}

function isTypingTarget(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null
  if (!element) return false
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) || element.isContentEditable
}

function onKeydown(event: KeyboardEvent): void {
  if (isTypingTarget(event.target)) return
  const ctrl = event.ctrlKey || event.metaKey

  if (ctrl && event.key.toLowerCase() === 'z') {
    event.preventDefault()
    if (event.shiftKey) historyStore.redo()
    else historyStore.undo()
    return
  }
  if (ctrl && event.key.toLowerCase() === 'y') {
    event.preventDefault()
    historyStore.redo()
    return
  }
  if (ctrl && event.key.toLowerCase() === 'd') {
    event.preventDefault()
    furnitureStore.duplicateSelected()
    return
  }
  if (event.key === 'Delete') {
    event.preventDefault()
    furnitureStore.removeSelected()
  }
}

onMounted(() => {
  projectStore.restoreDraft()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

let draftTimer: number | undefined
watch(
  [items, dimensions],
  () => {
    window.clearTimeout(draftTimer)
    draftTimer = window.setTimeout(() => projectStore.persistDraft(), 400)
  },
  { deep: true }
)
</script>

<template>
  <div class="constructor-page">
    <ConstructorToolbar
      :item-count="items.length"
      @clear="furnitureStore.clearAll"
      @open-projects="projectsOpen = true"
      @toggle-catalog="catalogOpen = !catalogOpen"
      @toggle-inspector="inspectorOpen = !inspectorOpen"
    />

    <div class="constructor-page__workspace">
      <div
        class="constructor-page__panel constructor-page__panel--catalog"
        :class="{ 'is-open': catalogOpen }"
      >
        <CatalogPanel />
      </div>

      <ConstructorCanvas />

      <div
        class="constructor-page__panel constructor-page__panel--inspector"
        :class="{ 'is-open': inspectorOpen }"
      >
        <InspectorSidebar />
      </div>

      <div
        v-if="catalogOpen || inspectorOpen"
        class="constructor-page__backdrop"
        @click="closePanels"
      ></div>
    </div>

    <ProjectManagerDialog :open="projectsOpen" @close="projectsOpen = false" />
    <ExportDocument />
  </div>
</template>

<style scoped>
.constructor-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.constructor-page__workspace {
  position: relative;
  flex: 1;
  display: flex;
  min-height: 0;
}

.constructor-page__panel {
  display: flex;
  min-height: 0;
}

.constructor-page__backdrop {
  display: none;
}

@media (max-width: 880px) {
  .constructor-page__panel {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 15;
    transition: transform 0.25s ease;
    box-shadow: var(--shadow-lg);
  }

  .constructor-page__panel--catalog {
    left: 0;
    transform: translateX(-100%);
  }

  .constructor-page__panel--inspector {
    right: 0;
    transform: translateX(100%);
  }

  .constructor-page__panel.is-open {
    transform: translateX(0);
  }

  .constructor-page__panel :deep(.catalog-panel),
  .constructor-page__panel :deep(.inspector-sidebar) {
    width: min(330px, 85vw);
  }

  .constructor-page__backdrop {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 10;
    background-color: rgba(20, 20, 20, 0.35);
  }
}
</style>
