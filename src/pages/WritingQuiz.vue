<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ArrowLeft, Check, Clock, PenTool } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { writingQuestions } from '@/data/questions'
import { updateProgress } from '@/utils/storage'

const router = useRouter()
const route = useRoute()

const quizId = route.params.id as string
const quiz = computed(() => writingQuestions.find(q => q.id === quizId))

const answer = ref('')
const isFinished = ref(false)
const score = ref(0)
const feedback = ref('')
const timer = ref(0)
let timerInterval: number | null = null

const wordCount = computed(() => answer.value.length)

onMounted(() => {
  if (!quiz.value) {
    router.push('/writing')
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
  router.push('/writing')
}

function evaluateWriting() {
  stopTimer()
  
  if (!quiz.value) return
  
  const text = answer.value.trim()
  
  if (!text) {
    score.value = 0
    feedback.value = '请输入您的作文内容'
    isFinished.value = true
    return
  }
  
  let points = 0
  const feedbackParts: string[] = []
  
  if (text.length >= quiz.value.wordCount * 0.8) {
    points += 30
    feedbackParts.push('✓ 字数达标')
  } else {
    feedbackParts.push('✗ 字数不足，建议至少写' + Math.round(quiz.value.wordCount * 0.8) + '词')
  }
  
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())
  if (paragraphs.length >= 3) {
    points += 20
    feedbackParts.push('✓ 结构清晰，段落分明')
  } else {
    feedbackParts.push('✗ 建议分成更多段落，使结构更清晰')
  }
  
  const grammarKeywords = ['dass', 'weil', 'obwohl', 'wenn', 'als', 'oder', 'und', 'aber']
  const grammarMatches = grammarKeywords.filter(k => text.includes(k))
  if (grammarMatches.length >= 3) {
    points += 25
    feedbackParts.push('✓ 语法运用丰富')
  } else {
    feedbackParts.push('✗ 建议使用更多连接词和从句结构')
  }
  
  const vocabKeywords = ['daher', 'deshalb', 'somit', 'jedoch', 'allerdings', 'ansonsten']
  const vocabMatches = vocabKeywords.filter(k => text.includes(k))
  if (vocabMatches.length >= 2) {
    points += 25
    feedbackParts.push('✓ 词汇运用得当')
  } else {
    feedbackParts.push('✗ 建议使用更多高级词汇')
  }
  
  score.value = Math.min(100, points)
  feedback.value = feedbackParts.join('\n')
  
  updateProgress('writing', score.value)
  isFinished.value = true
}

function restart() {
  answer.value = ''
  isFinished.value = false
  score.value = 0
  feedback.value = ''
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
              <div class="flex items-center space-x-2">
                <PenTool class="w-5 h-5" />
                <span>{{ wordCount }}/{{ quiz?.wordCount }}词</span>
              </div>
            </div>
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
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">写作任务</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-gray-700">{{ quiz.prompt }}</p>
                </div>
              </div>
              
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">写作要求</h3>
                <ul class="space-y-2">
                  <li v-for="(requirement, index) in quiz.requirements" :key="index" class="flex items-center space-x-2">
                    <span class="w-5 h-5 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm">
                      {{ index + 1 }}
                    </span>
                    <span class="text-gray-600">{{ requirement }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">请输入您的作文</h3>
                <textarea 
                  v-model="answer"
                  :placeholder="`请在此输入您的德语作文（建议${quiz.wordCount}词左右）...`"
                  class="w-full h-64 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#003366] resize-none font-mono text-sm"
                ></textarea>
              </div>
            </div>
            
            <div class="p-6 bg-gray-50 border-t flex justify-end">
              <button 
                @click="evaluateWriting"
                :disabled="!answer.trim()"
                class="px-8 py-3 bg-[#DAA520] text-[#003366] rounded-lg font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交并评分
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section v-else class="py-8">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-xl shadow-md p-8">
            <div class="text-center mb-8">
              <div class="w-24 h-24 bg-[#003366] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check class="w-12 h-12 text-white" />
              </div>
              
              <h2 class="text-3xl font-bold text-[#003366] mb-2">作文评分完成!</h2>
              <p class="text-gray-500">以下是您的评分和建议</p>
            </div>
            
            <div class="bg-gray-50 rounded-xl p-6 mb-6 text-center">
              <div class="text-6xl font-bold text-[#DAA520]">{{ score }}</div>
              <div class="text-gray-500 mt-2">得分</div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">评分详情</h3>
              <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-line text-gray-700">
                {{ feedback }}
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">您的作文</h3>
              <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-line text-gray-700">
                {{ answer || '未作答' }}
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