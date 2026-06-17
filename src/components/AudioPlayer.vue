<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-vue-next'

const props = defineProps<{
  audioUrl: string
}>()

const isPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const currentTime = ref(0)

let audio: HTMLAudioElement | null = null
let interval: number | null = null

onMounted(() => {
  audio = new Audio(props.audioUrl)
  audio.addEventListener('timeupdate', updateProgress)
  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio?.duration || 0
  })
  audio.addEventListener('ended', () => {
    isPlaying.value = false
    progress.value = 0
    currentTime.value = 0
    audio?.pause()
    if (audio) audio.currentTime = 0
  })
})

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio.removeEventListener('timeupdate', updateProgress)
  }
  if (interval) {
    clearInterval(interval)
  }
})

function updateProgress() {
  if (audio) {
    currentTime.value = audio.currentTime
    progress.value = (audio.currentTime / audio.duration) * 100
  }
}

function togglePlay() {
  if (!audio) return
  
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    audio.play()
    isPlaying.value = true
  }
}

function seek(e: Event) {
  if (!audio) return
  
  const target = e.target as HTMLInputElement
  const time = (parseFloat(target.value) / 100) * duration.value
  audio.currentTime = time
  currentTime.value = time
  progress.value = parseFloat(target.value)
}

function reset() {
  if (!audio) return
  audio.pause()
  audio.currentTime = 0
  isPlaying.value = false
  progress.value = 0
  currentTime.value = 0
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-4">
    <div class="flex items-center space-x-4">
      <button 
        @click="togglePlay"
        class="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center text-white hover:bg-[#0055AA] transition-colors"
      >
        <Play v-if="!isPlaying" class="w-6 h-6" />
        <Pause v-else class="w-6 h-6" />
      </button>
      
      <div class="flex-1">
        <div class="flex items-center space-x-2 mb-2">
          <span class="text-sm text-gray-600">{{ formatTime(currentTime) }}</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            :value="progress"
            @input="seek"
            class="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
          />
          <span class="text-sm text-gray-600">{{ formatTime(duration) }}</span>
        </div>
      </div>
      
      <button 
        @click="reset"
        class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <RotateCcw class="w-5 h-5" />
      </button>
      
      <div class="flex items-center space-x-1">
        <Volume2 class="w-5 h-5 text-gray-600" />
        <input 
          type="range" 
          min="0" 
          max="100" 
          value="80"
          class="w-16 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #003366;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #003366;
  cursor: pointer;
  border: none;
}
</style>