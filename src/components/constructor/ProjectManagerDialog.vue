<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/project-store'
import { useAuthStore } from '@/stores/auth-store'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import AuthForm from '@/components/auth/AuthForm.vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const projectStore = useProjectStore()
const authStore = useAuthStore()
const { sortedProjects, currentName, currentProjectId } = storeToRefs(projectStore)
const { isAuthenticated } = storeToRefs(authStore)

const nameDraft = ref(currentName.value)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) nameDraft.value = currentName.value
  }
)

function onSave(): void {
  projectStore.saveCurrent(nameDraft.value)
}

function onNew(): void {
  projectStore.startNewProject()
  nameDraft.value = currentName.value
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <BaseModal :open="props.open" title="Проекты" @close="emit('close')">
    <div v-if="!isAuthenticated" class="project-manager__auth">
      <p class="project-manager__auth-note">Войдите в аккаунт, чтобы сохранять проекты.</p>
      <AuthForm />
    </div>

    <div v-else class="project-manager">
      <div class="project-manager__save">
        <input
          v-model="nameDraft"
          class="project-manager__input"
          type="text"
          placeholder="Название проекта"
        />
        <BaseButton size="sm" @click="onSave">Сохранить</BaseButton>
      </div>

      <BaseButton size="sm" variant="outline" @click="onNew">Новый проект</BaseButton>

      <div class="project-manager__list">
        <p v-if="!sortedProjects.length" class="project-manager__empty">
          Нет сохранённых проектов.
        </p>
        <article
          v-for="project in sortedProjects"
          :key="project.id"
          class="project-manager__item"
          :class="{ 'is-current': project.id === currentProjectId }"
        >
          <div class="project-manager__meta">
            <span class="project-manager__name">{{ project.name }}</span>
            <span class="project-manager__date">{{ formatDate(project.updatedAt) }}</span>
          </div>
          <div class="project-manager__buttons">
            <BaseButton size="sm" variant="ghost" @click="projectStore.loadProject(project.id)">
              Открыть
            </BaseButton>
            <BaseButton size="sm" variant="ghost" @click="projectStore.deleteProject(project.id)">
              Удалить
            </BaseButton>
          </div>
        </article>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.project-manager {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.project-manager__auth {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.project-manager__auth-note {
  font-size: 13px;
  color: var(--color-ink-soft);
}

.project-manager__save {
  display: flex;
  gap: var(--space-2);
}

.project-manager__input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  outline: none;
}

.project-manager__input:focus {
  border-color: var(--color-ink);
}

.project-manager__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.project-manager__empty {
  font-size: 13px;
  color: var(--color-ink-faint);
}

.project-manager__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.project-manager__item.is-current {
  border-color: var(--color-ink);
}

.project-manager__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.project-manager__name {
  font-size: 14px;
  font-weight: 600;
}

.project-manager__date {
  font-size: 12px;
  color: var(--color-ink-faint);
}

.project-manager__buttons {
  display: flex;
  gap: var(--space-1);
}
</style>
