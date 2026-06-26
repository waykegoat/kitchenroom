<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: string
  width: number
  depth: number
  color: string
}>()

const w = computed(() => props.width)
const d = computed(() => props.depth)

const burners = computed(() => {
  const r = Math.min(w.value, d.value) * 0.16
  return [
    { cx: w.value * 0.3, cy: d.value * 0.3, r },
    { cx: w.value * 0.7, cy: d.value * 0.3, r },
    { cx: w.value * 0.3, cy: d.value * 0.7, r },
    { cx: w.value * 0.7, cy: d.value * 0.7, r }
  ]
})
</script>

<template>
  <g class="furniture-glyph">
    <rect class="furniture-glyph__body" :width="w" :height="d" :fill="color" rx="2" />

    <template v-if="type === 'stove'">
      <circle
        v-for="(burner, index) in burners"
        :key="index"
        class="furniture-glyph__line"
        :cx="burner.cx"
        :cy="burner.cy"
        :r="burner.r"
        fill="none"
      />
    </template>

    <template v-else-if="type === 'sink'">
      <rect
        class="furniture-glyph__inset"
        :x="w * 0.12"
        :y="d * 0.2"
        :width="w * 0.58"
        :height="d * 0.6"
        rx="4"
        fill="none"
      />
      <circle class="furniture-glyph__line" :cx="w * 0.41" :cy="d * 0.5" :r="Math.min(w, d) * 0.05" fill="none" />
      <circle class="furniture-glyph__detail" :cx="w * 0.85" :cy="d * 0.22" :r="Math.min(w, d) * 0.06" />
    </template>

    <template v-else-if="type === 'fridge'">
      <line class="furniture-glyph__line" :x1="w * 0.5" y1="0" :x2="w * 0.5" :y2="d" />
      <line class="furniture-glyph__handle" :x1="w * 0.44" :y1="d * 0.3" :x2="w * 0.44" :y2="d * 0.7" />
    </template>

    <template v-else-if="type === 'tall'">
      <line class="furniture-glyph__line" :x1="w * 0.5" y1="0" :x2="w * 0.5" :y2="d" />
      <line class="furniture-glyph__handle" :x1="w * 0.42" :y1="d * 0.4" :x2="w * 0.42" :y2="d * 0.6" />
      <line class="furniture-glyph__handle" :x1="w * 0.58" :y1="d * 0.4" :x2="w * 0.58" :y2="d * 0.6" />
    </template>

    <template v-else-if="type === 'corner'">
      <polyline
        class="furniture-glyph__line"
        :points="`${w * 0.5},${d} ${w * 0.5},${d * 0.5} ${w},${d * 0.5}`"
        fill="none"
      />
      <line class="furniture-glyph__handle" :x1="w * 0.2" :y1="d * 0.85" :x2="w * 0.35" :y2="d * 0.85" />
    </template>

    <template v-else-if="type === 'island'">
      <rect
        class="furniture-glyph__inset"
        :x="w * 0.08"
        :y="d * 0.12"
        :width="w * 0.84"
        :height="d * 0.76"
        rx="3"
        fill="none"
      />
    </template>

    <template v-else>
      <line class="furniture-glyph__line" :x1="w * 0.5" y1="0" :x2="w * 0.5" :y2="d" />
      <line
        class="furniture-glyph__handle"
        :x1="w * 0.32"
        :y1="d * 0.86"
        :x2="w * 0.68"
        :y2="d * 0.86"
      />
    </template>
  </g>
</template>

<style scoped>
.furniture-glyph__body {
  stroke: rgba(20, 20, 20, 0.32);
  stroke-width: 0.6;
}

.furniture-glyph__line {
  stroke: rgba(20, 20, 20, 0.4);
  stroke-width: 1;
}

.furniture-glyph__inset {
  stroke: rgba(20, 20, 20, 0.34);
  stroke-width: 1;
}

.furniture-glyph__handle {
  stroke: rgba(20, 20, 20, 0.55);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.furniture-glyph__detail {
  fill: rgba(20, 20, 20, 0.45);
}
</style>
