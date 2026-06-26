<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'ghost' | 'contrast'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'solid',
    size: 'md',
    type: 'button'
  }
)
</script>

<template>
  <button :type="type" class="base-button" :class="[`is-${variant}`, `is-${size}`]">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 600;
  line-height: 1;
  transition: transform 0.12s ease, background-color 0.18s ease, color 0.18s ease,
    border-color 0.18s ease;
}

.base-button:active {
  transform: translateY(1px);
}

.is-sm {
  padding: 8px 12px;
  font-size: 13px;
}

.is-md {
  padding: 11px 18px;
  font-size: 14px;
}

.is-lg {
  padding: 15px 26px;
  font-size: 16px;
}

.is-solid {
  background-color: var(--color-accent);
  color: var(--color-accent-contrast);
}

.is-solid:hover {
  background-color: #2c2c2c;
}

.is-outline {
  background-color: transparent;
  border-color: var(--color-border);
  color: var(--color-ink);
}

.is-outline:hover {
  border-color: var(--color-ink);
}

.is-ghost {
  background-color: transparent;
  color: var(--color-ink-soft);
}

.is-ghost:hover {
  background-color: var(--color-surface-muted);
  color: var(--color-ink);
}

.is-contrast {
  background-color: var(--color-surface);
  color: var(--color-ink);
}

.is-contrast:hover {
  background-color: #ececea;
}
</style>
