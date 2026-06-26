import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  createUserId,
  hashPassword,
  readSession,
  readUsers,
  writeSession,
  writeUsers
} from '@/services/auth-storage'

export interface AuthResult {
  ok: boolean
  error?: string
}

export interface SessionUser {
  id: string
  email: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<SessionUser | null>(restoreSession())

  const isAuthenticated = computed(() => currentUser.value !== null)

  function restoreSession(): SessionUser | null {
    const sessionId = readSession()
    if (!sessionId) return null
    const user = readUsers().find((entry) => entry.id === sessionId)
    return user ? { id: user.id, email: user.email } : null
  }

  function register(email: string, password: string): AuthResult {
    const normalized = email.trim().toLowerCase()
    if (!EMAIL_PATTERN.test(normalized)) return { ok: false, error: 'Некорректный email' }
    if (password.length < 6) return { ok: false, error: 'Минимум 6 символов в пароле' }

    const users = readUsers()
    if (users.some((user) => user.email === normalized)) {
      return { ok: false, error: 'Пользователь уже существует' }
    }

    const user = { id: createUserId(), email: normalized, passwordHash: hashPassword(password) }
    writeUsers([...users, user])
    writeSession(user.id)
    currentUser.value = { id: user.id, email: user.email }
    return { ok: true }
  }

  function login(email: string, password: string): AuthResult {
    const normalized = email.trim().toLowerCase()
    const user = readUsers().find((entry) => entry.email === normalized)
    if (!user || user.passwordHash !== hashPassword(password)) {
      return { ok: false, error: 'Неверный email или пароль' }
    }
    writeSession(user.id)
    currentUser.value = { id: user.id, email: user.email }
    return { ok: true }
  }

  function logout(): void {
    writeSession(null)
    currentUser.value = null
  }

  return { currentUser, isAuthenticated, register, login, logout }
})
