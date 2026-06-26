<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth-store'
import BaseButton from './BaseButton.vue'
import AuthDialog from '@/components/auth/AuthDialog.vue'

const authStore = useAuthStore()
const { currentUser, isAuthenticated } = storeToRefs(authStore)

const authOpen = ref(false)
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <RouterLink to="/" class="app-header__brand">
        <span class="app-header__mark"></span>
        <span class="app-header__brand-text">
          <span class="app-header__name">КУХНИ<strong>ДЕЛИЯ</strong></span>
          <span class="app-header__tagline">Конструктор кухонь</span>
        </span>
      </RouterLink>

      <nav class="app-header__nav">
        <RouterLink to="/examples" class="app-header__link">Примеры</RouterLink>
      </nav>

      <div class="app-header__account">
        <template v-if="isAuthenticated">
          <span class="app-header__email">{{ currentUser?.email }}</span>
          <BaseButton size="sm" variant="ghost" @click="authStore.logout">Выйти</BaseButton>
        </template>
        <BaseButton v-else size="sm" @click="authOpen = true">Войти</BaseButton>
      </div>
    </div>

    <AuthDialog :open="authOpen" @close="authOpen = false" />
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  height: 88px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-right: auto;
}

.app-header__mark {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background-color: var(--color-ink);
}

.app-header__brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-header__name {
  font-size: 19px;
  letter-spacing: 0.1em;
  font-weight: 500;
}

.app-header__tagline {
  font-size: 12px;
  color: var(--color-ink-faint);
  letter-spacing: 0.02em;
}

.app-header__nav {
  display: flex;
  gap: var(--space-5);
}

.app-header__link {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-ink-soft);
  transition: color 0.16s ease;
}

.app-header__link:hover,
.app-header__link.router-link-active {
  color: var(--color-ink);
}

.app-header__account {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.app-header__email {
  font-size: 13px;
  color: var(--color-ink-soft);
}
</style>
