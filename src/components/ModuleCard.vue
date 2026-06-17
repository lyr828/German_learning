<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  description: string
  icon: any
  path: string
  progress: number
  score: number
}>()

const router = useRouter()

function navigate() {
  router.push(props.path)
}

const progressColor = computed(() => {
  if (props.progress >= 80) return 'bg-green-500'
  if (props.progress >= 50) return 'bg-[#DAA520]'
  return 'bg-blue-500'
})
</script>

<template>
  <div 
    class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
    @click="navigate"
  >
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="w-14 h-14 bg-[#003366]/10 rounded-xl flex items-center justify-center">
          <component :is="icon" class="w-7 h-7 text-[#003366]" />
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-[#003366]">{{ score }}</div>
          <div class="text-xs text-gray-400">最高分</div>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-500 text-sm mb-4">{{ description }}</p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-xs text-gray-400">进度</span>
          <div class="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              :class="['h-full rounded-full transition-all duration-500', progressColor]"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
          <span class="text-xs text-gray-500 font-medium">{{ progress }}%</span>
        </div>
        <span class="text-xs text-[#003366] font-medium">开始学习 →</span>
      </div>
    </div>
  </div>
</template>