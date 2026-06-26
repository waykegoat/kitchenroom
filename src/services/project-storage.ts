import type { ProjectSnapshot } from '@/types/kitchen-types'

const PROJECTS_PREFIX = 'kitchen-constructor:projects'
const DRAFT_KEY = 'kitchen-constructor:draft'

function projectsKey(userId: string | null): string {
  return `${PROJECTS_PREFIX}:${userId ?? 'guest'}`
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function readProjects(userId: string | null): ProjectSnapshot[] {
  return safeParse<ProjectSnapshot[]>(localStorage.getItem(projectsKey(userId)), [])
}

export function writeProjects(userId: string | null, projects: ProjectSnapshot[]): void {
  localStorage.setItem(projectsKey(userId), JSON.stringify(projects))
}

export function readDraft(): ProjectSnapshot | null {
  return safeParse<ProjectSnapshot | null>(localStorage.getItem(DRAFT_KEY), null)
}

export function writeDraft(draft: ProjectSnapshot): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function createProjectId(): string {
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
