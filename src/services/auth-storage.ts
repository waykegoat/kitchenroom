export interface StoredUser {
  id: string
  email: string
  passwordHash: string
}

const USERS_KEY = 'kitchen-constructor:users'
const SESSION_KEY = 'kitchen-constructor:session'

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function hashPassword(password: string): string {
  let hash = 5381
  for (let i = 0; i < password.length; i += 1) {
    hash = (hash * 33) ^ password.charCodeAt(i)
  }
  return (hash >>> 0).toString(16)
}

export function readUsers(): StoredUser[] {
  return safeParse<StoredUser[]>(localStorage.getItem(USERS_KEY), [])
}

export function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function readSession(): string | null {
  return localStorage.getItem(SESSION_KEY)
}

export function writeSession(userId: string | null): void {
  if (userId) localStorage.setItem(SESSION_KEY, userId)
  else localStorage.removeItem(SESSION_KEY)
}

export function createUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
