<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Transition name="base-modal">
    <div v-if="open" class="base-modal" @click.self="emit('close')">
      <div class="base-modal__dialog" role="dialog" aria-modal="true">
        <header class="base-modal__head">
          <h2 class="base-modal__title">{{ title }}</h2>
          <button class="base-modal__close" aria-label="Закрыть" @click="emit('close')">×</button>
        </header>
        <div class="base-modal__body">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.base-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-5);
  background-color: rgba(20, 20, 20, 0.42);
}

.base-modal__dialog {
  width: 100%;
  max-width: 480px;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.base-modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.base-modal__title {
  font-size: 17px;
  font-weight: 700;
}

.base-modal__close {
  border: none;
  background: transparent;
  font-size: 24px;
  line-height: 1;
  color: var(--color-ink-faint);
}

.base-modal__close:hover {
  color: var(--color-ink);
}

.base-modal__body {
  padding: var(--space-5);
  overflow-y: auto;
}

.base-modal-enter-active,
.base-modal-leave-active {
  transition: opacity 0.18s ease;
}

.base-modal-enter-from,
.base-modal-leave-to {
  opacity: 0;
}
</style>
