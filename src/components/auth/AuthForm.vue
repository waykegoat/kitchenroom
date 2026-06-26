<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import BaseButton from '@/components/common/BaseButton.vue'

const emit = defineEmits<{
  success: []
}>()

const authStore = useAuthStore()

const mode = ref<'login' | 'register'>('login')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

function setMode(next: 'login' | 'register'): void {
  mode.value = next
  error.value = null
}

function onSubmit(): void {
  const result =
    mode.value === 'login'
      ? authStore.login(email.value, password.value)
      : authStore.register(email.value, password.value)

  if (result.ok) {
    error.value = null
    password.value = ''
    emit('success')
  } else {
    error.value = result.error ?? 'Ошибка'
  }
}
</script>

<template>
  <form class="auth-form" @submit.prevent="onSubmit">
    <div class="auth-form__tabs">
      <button
        type="button"
        class="auth-form__tab"
        :class="{ 'is-active': mode === 'login' }"
        @click="setMode('login')"
      >
        Вход
      </button>
      <button
        type="button"
        class="auth-form__tab"
        :class="{ 'is-active': mode === 'register' }"
        @click="setMode('register')"
      >
        Регистрация
      </button>
    </div>

    <label class="auth-form__field">
      <span>Email</span>
      <input v-model="email" type="email" autocomplete="email" placeholder="you@mail.ru" />
    </label>

    <label class="auth-form__field">
      <span>Пароль</span>
      <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••" />
    </label>

    <p v-if="error" class="auth-form__error">{{ error }}</p>

    <BaseButton type="submit" size="md">
      {{ mode === 'login' ? 'Войти' : 'Создать аккаунт' }}
    </BaseButton>

    <p class="auth-form__note">Данные хранятся локально в браузере.</p>
  </form>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.auth-form__tabs {
  display: inline-flex;
  padding: 3px;
  background-color: var(--color-surface-muted);
  border-radius: var(--radius-sm);
}

.auth-form__tab {
  flex: 1;
  border: none;
  background: transparent;
  padding: 9px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink-soft);
  border-radius: 4px;
}

.auth-form__tab.is-active {
  background-color: var(--color-ink);
  color: var(--color-accent-contrast);
}

.auth-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--color-ink-soft);
}

.auth-form__field input {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
}

.auth-form__field input:focus {
  border-color: var(--color-ink);
}

.auth-form__error {
  font-size: 13px;
  color: #c0392b;
}

.auth-form__note {
  font-size: 12px;
  color: var(--color-ink-faint);
  text-align: center;
}
</style>
