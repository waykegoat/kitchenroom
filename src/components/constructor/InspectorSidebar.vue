<script setup lang="ts">
import RoomSettingsPanel from './RoomSettingsPanel.vue'
import SelectionPropertiesPanel from './SelectionPropertiesPanel.vue'
import EstimateSummary from './EstimateSummary.vue'
</script>

<template>
  <aside class="inspector-sidebar">
    <RoomSettingsPanel />
    <SelectionPropertiesPanel />
    <EstimateSummary />
  </aside>
</template>

<style scoped>
.inspector-sidebar {
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-shrink: 0;
  background-color: var(--color-surface);
  border-left: 1px solid var(--color-border);
  overflow-y: auto;
}
</style>
