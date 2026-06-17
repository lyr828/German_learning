<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ progress: number; size?: number; strokeWidth?: number }>()
const size = computed(() => props.size || 120)
const strokeWidth = computed(() => props.strokeWidth || 8)
const radius = computed(() => (size.value - strokeWidth.value) / 2)
const circumference = computed(() => radius.value * 2 * Math.PI)
const offset = computed(() => circumference.value - (props.progress / 100) * circumference.value)
</script>

<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="size" :height="size" class="transform -rotate-90">
      <circle :cx="size/2" :cy="size/2" :r="radius" fill="none" :stroke-width="strokeWidth" class="stroke-gray-200"/>
      <circle :cx="size/2" :cy="size/2" :r="radius" fill="none" :stroke-width="strokeWidth" class="stroke-[#003366] transition-all duration-1000 ease-out" stroke-linecap="round" :stroke-dasharray="circumference" :stroke-dashoffset="offset"/>
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-3xl font-bold text-[#003366]">{{ progress }}%</span>
      <span class="text-sm text-gray-500">总进度</span>
    </div>
  </div>
</template>