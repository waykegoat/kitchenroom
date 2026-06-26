import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { ExampleKitchen, ProjectSnapshot } from '@/types/kitchen-types'
import { useRoomStore } from './room-store'
import { useFurnitureStore } from './furniture-store'
import { useAuthStore } from './auth-store'
import {
  createProjectId,
  readDraft,
  readProjects,
  writeDraft,
  writeProjects
} from '@/services/project-storage'

export const useProjectStore = defineStore('project', () => {
  const authStore = useAuthStore()
  const projects = ref<ProjectSnapshot[]>(readProjects(authStore.currentUser?.id ?? null))
  const currentProjectId = ref<string | null>(null)
  const currentName = ref('Новый проект')

  watch(
    () => authStore.currentUser?.id ?? null,
    (userId) => {
      projects.value = readProjects(userId)
      currentProjectId.value = null
      currentName.value = 'Новый проект'
    }
  )

  const sortedProjects = computed(() =>
    [...projects.value].sort((a, b) => b.updatedAt - a.updatedAt)
  )

  function buildSnapshot(id: string, name: string): ProjectSnapshot {
    const roomStore = useRoomStore()
    const furnitureStore = useFurnitureStore()
    const existing = projects.value.find((project) => project.id === id)
    return {
      id,
      name,
      createdAt: existing?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
      dimensions: { ...roomStore.dimensions },
      shape: roomStore.shape,
      notchWidth: roomStore.notchWidth,
      notchDepth: roomStore.notchDepth,
      items: furnitureStore.items.map((item) => ({ ...item, position: { ...item.position } }))
    }
  }

  function applySnapshot(snapshot: ProjectSnapshot): void {
    const roomStore = useRoomStore()
    const furnitureStore = useFurnitureStore()
    roomStore.setWidth(snapshot.dimensions.width)
    roomStore.setDepth(snapshot.dimensions.depth)
    roomStore.setWallHeight(snapshot.dimensions.wallHeight)
    roomStore.setShape(snapshot.shape ?? 'rectangle')
    if (snapshot.notchWidth !== undefined) roomStore.setNotchWidth(snapshot.notchWidth)
    if (snapshot.notchDepth !== undefined) roomStore.setNotchDepth(snapshot.notchDepth)
    furnitureStore.replaceAll(snapshot.items)
  }

  function saveCurrent(name: string): void {
    const trimmed = name.trim() || 'Без названия'
    const id = currentProjectId.value ?? createProjectId()
    const snapshot = buildSnapshot(id, trimmed)
    const index = projects.value.findIndex((project) => project.id === id)
    if (index >= 0) projects.value[index] = snapshot
    else projects.value.push(snapshot)
    writeProjects(authStore.currentUser?.id ?? null, projects.value)
    currentProjectId.value = id
    currentName.value = trimmed
  }

  function loadProject(id: string): void {
    const snapshot = projects.value.find((project) => project.id === id)
    if (!snapshot) return
    applySnapshot(snapshot)
    currentProjectId.value = snapshot.id
    currentName.value = snapshot.name
  }

  function deleteProject(id: string): void {
    projects.value = projects.value.filter((project) => project.id !== id)
    writeProjects(authStore.currentUser?.id ?? null, projects.value)
    if (currentProjectId.value === id) {
      currentProjectId.value = null
    }
  }

  function loadExample(example: ExampleKitchen): void {
    const roomStore = useRoomStore()
    const furnitureStore = useFurnitureStore()
    roomStore.setShape(example.shape)
    roomStore.setWidth(example.dimensions.width)
    roomStore.setDepth(example.dimensions.depth)
    roomStore.setWallHeight(example.dimensions.wallHeight)
    roomStore.setNotchWidth(example.notchWidth)
    roomStore.setNotchDepth(example.notchDepth)
    furnitureStore.replaceAll(example.items)
    currentProjectId.value = null
    currentName.value = example.title
  }

  function startNewProject(): void {
    const furnitureStore = useFurnitureStore()
    furnitureStore.clearAll()
    currentProjectId.value = null
    currentName.value = 'Новый проект'
  }

  function persistDraft(): void {
    writeDraft(buildSnapshot(currentProjectId.value ?? 'draft', currentName.value))
  }

  function restoreDraft(): void {
    const draft = readDraft()
    if (draft) applySnapshot(draft)
  }

  return {
    projects,
    sortedProjects,
    currentProjectId,
    currentName,
    saveCurrent,
    loadProject,
    deleteProject,
    loadExample,
    startNewProject,
    persistDraft,
    restoreDraft
  }
})
