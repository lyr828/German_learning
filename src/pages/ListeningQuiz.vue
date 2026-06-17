<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowLeft, Play, Check, Clock } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { listeningQuestions } from '@/data/questions'
import { updateProgress } from '@/utils/storage'

const router = useRouter()
const route = useRoute()

const quizId = route.params.id as string
const quiz = computed(() => listeningQuestions.find(q => q.id === quizId))

const currentQuestionIndex = ref(0)
const answers = ref<Record<number, string>>({})
const isFinished = ref(false)
const score = ref(0)
const timer = ref(0)
let timerInterval: number | null = null

const currentQuestion = computed(() => {
  if (!quiz.value) return null
  return quiz.value.questions[currentQuestionIndex.value]
})

const progress = computed(() => {
  if (!quiz.value) return 0
  return ((currentQuestionIndex.value + 1) / quiz.value.questions.length) * 100
})

onMounted(() => {
  if (!quiz.value) {
    router.push('/listening')
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

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function goBack() {
  stopTimer()
  router.push('/listening')
}

function selectAnswer(answer: string) {
  answers.value[currentQuestionIndex.value] = answer
}

function nextQuestion() {
  if (!quiz.value) return
  if (currentQuestionIndex.value < quiz.value.questions.length - 1) {
    currentQuestionIndex.value++
  }
}

function prevQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

function submitQuiz() {
  stopTimer()
  let correct = 0
  if (quiz.value) {
    quiz.value.questions.forEach((q, index) => {
      if (answers.value[index] === q.correctAnswer) {
        correct++
      }
    })
    score.value = Math.round((correct / quiz.value.questions.length) * 100)
    updateProgress('listening', score.value)
  }
  isFinished.value = true
}

function restart() {
  currentQuestionIndex.value = 0
  answers.value = {}
  isFinished.value = false
  score.value = 0
  timer.value = 0
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
              <span class="text-sm">进度: {{ currentQuestionIndex + 1 }}/{{ quiz?.questions.length }}</span>
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
            
            <div class="p-6">
              <div v-if="currentQuestion" class="mb-6">
                <div class="flex items-start space-x-3 mb-4">
                  <span class="w-8 h-8 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {{ currentQuestionIndex + 1 }}
                  </span>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ currentQuestion.question }}</h3>
                    <p v-if="currentQuestion.context" class="text-gray-600 text-sm italic">
                      {{ currentQuestion.context }}
                    </p>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <button
                    v-for="(option, index) in currentQuestion.options"
                    :key="index"
                    @click="selectAnswer(option)"
                    :class="[
                      'w-full p-4 rounded-lg border-2 text-left transition-all duration-300',
                      answers[currentQuestionIndex] === option
                        ? 'border-[#003366] bg-[#003366]/5'
                        : 'border-gray-200 hover:border-[#003366]/50 hover:bg-gray-50'
                    ]"
                  >
                    <div class="flex items-center space-x-3">
                      <span 
                        :class="[
                          'w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium',
                          answers[currentQuestionIndex] === option
                            ? 'bg-[#003366] text-white'
                            : 'bg-gray-100 text-gray-600'
                        ]"
                      >
                        {{ String.fromCharCode(65 + index) }}
                      </span>
                      <span class="text-gray-700">{{ option }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="p-6 bg-gray-50 border-t flex justify-between">
              <button 
                @click="prevQuestion"
                :disabled="currentQuestionIndex === 0"
                class="px-6 py-2 rounded-lg font-medium transition-colors"
                :class="currentQuestionIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
              >
                上一题
              </button>
              <button 
                v-if="currentQuestionIndex < quiz.questions.length - 1"
                @click="nextQuestion"
                class="px-6 py-2 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#004488] transition-colors"
              >
                下一题
              </button>
              <button 
                v-else
                @click="submitQuiz"
                class="px-6 py-2 bg-[#DAA520] text-[#003366] rounded-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                提交答案
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
            
            <h2 class="text-3xl font-bold text-[#003366] mb-2">测验完成!</h2>
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
                  {{ quiz ? Object.values(answers).filter((a, i) => a === quiz.questions[i].correctAnswer).length : 0 }}
                </div>
                <div class="text-sm text-gray-500">正确</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-red-600">
                  {{ quiz ? quiz.questions.length - Object.keys(answers).length : 0 }}
                </div>
                <div class="text-sm text-gray-500">未答</div>
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