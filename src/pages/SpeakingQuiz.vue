<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowLeft, Check, Clock, Mic, MicOff, Play } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { speakingQuestions } from '@/data/questions'
import { updateProgress } from '@/utils/storage'

const router = useRouter()
const route = useRoute()

const quizId = route.params.id as string
const quiz = computed(() => speakingQuestions.find(q => q.id === quizId))

const currentPartIndex = ref(0)
const recordings = ref<Record<number, string>>({})
const isRecording = ref(false)
const isFinished = ref(false)
const score = ref(0)
const timer = ref(0)
const partTimer = ref(0)
let timerInterval: number | null = null
let partTimerInterval: number | null = null
let mediaRecorder: MediaRecorder | null = null
let audioChunks: Blob[] = []

const currentPart = computed(() => {
  if (!quiz.value) return null
  return quiz.value.parts[currentPartIndex.value]
})

const progress = computed(() => {
  if (!quiz.value) return 0
  return ((currentPartIndex.value + 1) / quiz.value.parts.length) * 100
})

onMounted(() => {
  if (!quiz.value) {
    router.push('/speaking')
    return
  }
  startTimer()
})

function startTimer() {
  timerInterval = window.setInterval(() => {
    timer.value++
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function startPartTimer() {
  stopPartTimer()
  partTimer.value = 0
  partTimerInterval = window.setInterval(() => {
    partTimer.value++
  }, 1000)
}

function stopPartTimer() {
  if (partTimerInterval) {
    clearInterval(partTimerInterval)
    partTimerInterval = null
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function goBack() {
  stopTimer()
  stopPartTimer()
  router.push('/speaking')
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []
    
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
      const audioUrl = URL.createObjectURL(audioBlob)
      recordings.value[currentPartIndex.value] = audioUrl
    }
    
    mediaRecorder.start()
    isRecording.value = true
    startPartTimer()
  } catch (error) {
    console.error('Failed to start recording:', error)
  }
}

function stopRecording() {
  if (mediaRecorder && isRecording.value) {
    mediaRecorder.stop()
    isRecording.value = false
    stopPartTimer()
    mediaRecorder.stream.getTracks().forEach(track => track.stop())
  }
}

function playRecording(partIndex: number) {
  const url = recordings.value[partIndex]
  if (url) {
    const audio = new Audio(url)
    audio.play()
  }
}

function nextPart() {
  if (!quiz.value) return
  if (currentPartIndex.value < quiz.value.parts.length - 1) {
    currentPartIndex.value++
  }
}

function prevPart() {
  if (currentPartIndex.value > 0) {
    currentPartIndex.value--
  }
}

function submitQuiz() {
  stopTimer()
  stopPartTimer()
  
  let points = 0
  const recordedParts = Object.keys(recordings.value).length
  
  if (!quiz.value) return
  
  if (recordedParts === quiz.value.parts.length) {
    points += 40
  } else if (recordedParts >= quiz.value.parts.length * 0.7) {
    points += 20
  }
  
  points += Math.min(60, recordedParts * 15)
  
  score.value = Math.min(100, points)
  updateProgress('speaking', score.value)
  isFinished.value = true
}

function restart() {
  currentPartIndex.value = 0
  recordings.value = {}
  isRecording.value = false
  isFinished.value = false
  score.value = 0
  timer.value = 0
  partTimer.value = 0
  startTimer()
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-1">
      <section class="bg-gradient-to-r from-[#003366] to-[#0055AA] text-white py-4">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <button 
              @click="goBack"
              class="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft class="w-5 h-5" />
              <span>返回</span>
            </button>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <Clock class="w-5 h-5" />
                <span>{{ formatTime(timer) }}</span>
              </div>
              <span class="text-sm">进度: {{ currentPartIndex + 1 }}/{{ quiz?.parts.length }}</span>
            </div>
          </div>
          <div class="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              class="h-full bg-[#DAA520] rounded-full transition-all duration-300"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
      </section>
      
      <section v-if="!isFinished" class="py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div v-if="quiz" class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 bg-gray-50 border-b">
              <h2 class="text-xl font-bold text-[#003366]">{{ quiz.title }}</h2>
              <p class="text-gray-500 mt-1">{{ quiz.description }}</p>
            </div>
            
            <div v-if="currentPart" class="p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Part {{ currentPartIndex + 1 }}: {{ currentPart.type }}</h3>
                  <p class="text-gray-500 text-sm mt-1">准备时间: {{ currentPart.preparationTime }}秒 | 发言时间: {{ currentPart.speakingTime }}秒</p>
                </div>
                <div 
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium',
                    isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
                  ]"
                >
                  {{ isRecording ? formatTime(partTimer) : '--:--' }}
                </div>
              </div>
              
              <div class="bg-gray-50 rounded-lg p-6 mb-6">
                <p class="text-gray-700 text-lg">{{ currentPart.prompt }}</p>
                <div v-if="currentPart.notes" class="mt-4">
                  <h4 class="text-sm font-medium text-gray-500 mb-2">提示要点:</h4>
                  <ul class="space-y-1">
                    <li v-for="(note, index) in currentPart.notes" :key="index" class="text-sm text-gray-600">
                      • {{ note }}
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="relative mb-6">
                  <button 
                    @click="isRecording ? stopRecording() : startRecording()"
                    :class="[
                      'w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg',
                      isRecording 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-[#003366] hover:bg-[#004488]'
                    ]"
                  >
                    <Mic v-if="!isRecording" class="w-10 h-10 text-white" />
                    <MicOff v-else class="w-10 h-10 text-white" />
                  </button>
                  <div 
                    v-if="isRecording"
                    class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-red-500 font-medium"
                  >
                    录音中...
                  </div>
                </div>
                
                <div v-if="recordings[currentPartIndex]" class="flex items-center space-x-4">
                  <button 
                    @click="playRecording(currentPartIndex)"
                    class="px-4 py-2 bg-green-100 text-green-600 rounded-lg flex items-center space-x-2 hover:bg-green-200 transition-colors"
                  >
                    <Play class="w-4 h-4" />
                    <span>播放录音</span>
                  </button>
                  <button 
                    @click="delete recordings[currentPartIndex]"
                    class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    重新录制
                  </button>
                </div>
              </div>
            </div>
            
            <div class="p-6 bg-gray-50 border-t flex justify-between">
              <button 
                @click="prevPart"
                :disabled="currentPartIndex === 0"
                class="px-6 py-2 rounded-lg font-medium transition-colors"
                :class="currentPartIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
              >
                上一部分
              </button>
              <button 
                v-if="currentPartIndex < quiz.parts.length - 1"
                @click="nextPart"
                class="px-6 py-2 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#004488] transition-colors"
              >
                下一部分
              </button>
              <button 
                v-else
                @click="submitQuiz"
                class="px-6 py-2 bg-[#DAA520] text-[#003366] rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                提交练习
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section v-else class="py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-xl shadow-md p-8 text-center">
            <div class="w-24 h-24 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check class="w-12 h-12 text-white" />
            </div>
            
            <h2 class="text-3xl font-bold text-[#003366] mb-2">口语练习完成!</h2>
            <p class="text-gray-500 mb-6">您的表现非常出色</p>
            
            <div class="bg-gray-50 rounded-xl p-6 mb-6">
              <div class="text-6xl font-bold text-[#DAA520]">{{ score }}</div>
              <div class="text-gray-500 mt-2">得分</div>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mb-8">
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-[#003366]">{{ timer }}</div>
                <div class="text-sm text-gray-500">用时(秒)</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-green-600">
                  {{ Object.keys(recordings).length }}
                </div>
                <div class="text-sm text-gray-500">已录制</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-[#003366]">
                  {{ quiz ? quiz.parts.length - Object.keys(recordings).length : 0 }}
                </div>
                <div class="text-sm text-gray-500">未录制</div>
              </div>
            </div>
            
            <div class="flex justify-center space-x-4">
              <button 
                @click="restart"
                class="px-6 py-3 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#004488] transition-colors"
              >
                重新练习
              </button>
              <button 
                @click="goBack"
                class="px-6 py-3 border-2 border-[#003366] text-[#003366] rounded-lg font-medium hover:bg-[#003366]/5 transition-colors"
              >
                返回列表
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>