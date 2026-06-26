<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <span class="app-footer__copy">© {{ currentYear }} КУХНИ ДЕЛИЯ</span>
    <span class="app-footer__note">Спроектируйте кухню мечты онлайн</span>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
  font-size: 13px;
  color: var(--color-ink-faint);
}
</style>
