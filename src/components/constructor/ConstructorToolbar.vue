<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/stores/editor-store'
import { useHistoryStore } from '@/stores/history-store'
import BaseButton from '@/components/common/BaseButton.vue'
import ExportMenu from './ExportMenu.vue'
import type { ConstructorViewMode } from '@/types/kitchen-types'

defineProps<{
  itemCount: number
}>()

const emit = defineEmits<{
  clear: []
  'open-projects': []
  'toggle-catalog': []
  'toggle-inspector': []
}>()

const editorStore = useEditorStore()
const historyStore = useHistoryStore()
const { viewMode, snapEnabled } = storeToRefs(editorStore)
const { canUndo, canRedo } = storeToRefs(historyStore)

const modes: { value: ConstructorViewMode; label: string }[] = [
  { value: 'plan', label: 'План' },
  { value: 'perspective', label: 'Объём' }
]
</script>

<template>
  <div class="constructor-toolbar">
    <div class="constructor-toolbar__left">
      <RouterLink to="/" class="constructor-toolbar__back">← КУХНИДЕЛИЯ</RouterLink>
      <button
        class="constructor-toolbar__panel-toggle"
        @click="emit('toggle-catalog')"
      >
        Каталог
      </button>
    </div>

    <div class="constructor-toolbar__center">
      <div class="constructor-toolbar__history">
        <button
          class="constructor-toolbar__icon-btn"
          :disabled="!canUndo"
          title="Отменить (Ctrl+Z)"
          @click="historyStore.undo()"
        >
          ↶
        </button>
        <button
          class="constructor-toolbar__icon-btn"
          :disabled="!canRedo"
          title="Вернуть (Ctrl+Y)"
          @click="historyStore.redo()"
        >
          ↷
        </button>
      </div>

      <div class="constructor-toolbar__switch">
        <button
          v-for="mode in modes"
          :key="mode.value"
          class="constructor-toolbar__switch-btn"
          :class="{ 'is-active': mode.value === viewMode }"
          @click="editorStore.setViewMode(mode.value)"
        >
          {{ mode.label }}
        </button>
      </div>

      <button
        class="constructor-toolbar__snap"
        :class="{ 'is-active': snapEnabled }"
        @click="editorStore.toggleSnap"
      >
        Привязка
      </button>
    </div>

    <div class="constructor-toolbar__right">
      <span class="constructor-toolbar__count">{{ itemCount }} объектов</span>
      <BaseButton size="sm" variant="ghost" @click="emit('clear')">Очистить</BaseButton>
      <ExportMenu />
      <BaseButton size="sm" @click="emit('open-projects')">Проекты</BaseButton>
      <button
        class="constructor-toolbar__panel-toggle"
        @click="emit('toggle-inspector')"
      >
        Свойства
      </button>
    </div>
  </div>
</template>

<style scoped>
.constructor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 var(--space-5);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.constructor-toolbar__left,
.constructor-toolbar__right {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.constructor-toolbar__right {
  justify-content: flex-end;
}

.constructor-toolbar__center {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.constructor-toolbar__back {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-ink-soft);
}

.constructor-toolbar__back:hover {
  color: var(--color-ink);
}

.constructor-toolbar__switch {
  display: inline-flex;
  padding: 3px;
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-sm);
}

.constructor-toolbar__switch-btn {
  border: none;
  background: transparent;
  padding: 7px 18px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-soft);
  border-radius: 4px;
  transition: background-color 0.16s ease, color 0.16s ease;
}

.constructor-toolbar__switch-btn.is-active {
  background-color: var(--color-ink);
  color: var(--color-accent-contrast);
}

.constructor-toolbar__snap {
  border: 1px solid var(--color-border);
  background: transparent;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-faint);
  border-radius: var(--radius-sm);
  transition: border-color 0.16s ease, color 0.16s ease;
}

.constructor-toolbar__snap.is-active {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.constructor-toolbar__count {
  font-size: 13px;
  color: var(--color-ink-faint);
}

.constructor-toolbar__history {
  display: inline-flex;
  gap: var(--space-1);
}

.constructor-toolbar__icon-btn {
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-border);
  background: transparent;
  border-radius: var(--radius-sm);
  font-size: 16px;
  color: var(--color-ink-soft);
  transition: border-color 0.16s ease, color 0.16s ease, opacity 0.16s ease;
}

.constructor-toolbar__icon-btn:hover:not(:disabled) {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.constructor-toolbar__icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.constructor-toolbar__panel-toggle {
  display: none;
  border: 1px solid var(--color-border);
  background: transparent;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-soft);
  border-radius: var(--radius-sm);
}

@media (max-width: 1024px) {
  .constructor-toolbar__count {
    display: none;
  }
}

@media (max-width: 880px) {
  .constructor-toolbar__panel-toggle {
    display: inline-block;
  }

  .constructor-toolbar__center {
    display: none;
  }
}
</style>
