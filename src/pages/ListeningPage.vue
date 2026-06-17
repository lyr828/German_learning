<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, Play, FileText, Trophy } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { listeningQuestions } from '@/data/questions'
import { getProgress, saveProgress } from '@/utils/storage'

const router = useRouter()
const progress = ref(getProgress())

const examTypes = ['goethe', 'daf'] as const

const filteredQuestions = computed(() => {
  return listeningQuestions
})

const stats = computed(() => ({
  total: listeningQuestions.length,
  completed: progress.value.listening.completed,
  score: progress.value.listening.score
}))

function goBack() {
  router.push('/')
}

function startQuiz(id: string) {
  router.push(`/listening/quiz/${id}`)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-1">
      <section class="bg-gradient-to-r from-[#003366] to-[#0055AA] text-white py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <button 
              @click="goBack"
              class="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft class="w-5 h-5" />
              <span>返回首页</span>
            </button>
            <h1 class="text-2xl md:text-3xl font-bold">听力练习</h1>
            <div class="w-20"></div>
          </div>
        </div>
      </section>
      
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
              <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText class="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div class="text-2xl font-bold text-[#003366]">{{ stats.total }}</div>
                <div class="text-sm text-gray-500">总题目数</div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
              <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Play class="w-7 h-7 text-green-600" />
              </div>
              <div>
                <div class="text-2xl font-bold text-[#003366]">{{ stats.completed }}</div>
                <div class="text-sm text-gray-500">已完成</div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
              <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy class="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <div class="text-2xl font-bold text-[#003366]">{{ stats.score }}</div>
                <div class="text-sm text-gray-500">最高分数</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-8 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-xl font-bold text-[#003366] mb-6">听力题目列表</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="question in filteredQuestions"
              :key="question.id"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              @click="startQuiz(question.id)"
            >
              <div class="p-5">
                <div class="flex items-center justify-between mb-3">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      question.examType === 'goethe' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    ]"
                  >
                    {{ question.examType === 'goethe' ? '歌德考试' : '德福考试' }}
                  </span>
                  <span class="text-sm text-gray-400">难度: {{ '★'.repeat(question.difficulty) }}{{ '☆'.repeat(5 - question.difficulty) }}</span>
                </div>
                
                <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {{ question.title }}
                </h3>
                
                <p class="text-sm text-gray-500 mb-4 line-clamp-2">
                  {{ question.description }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{{ question.duration }}分钟</span>
                    <span>|</span>
                    <span>{{ question.questions.length }}题</span>
                  </div>
                  <button class="px-4 py-2 bg-[#003366] text-white rounded-lg text-sm font-medium hover:bg-[#004488] transition-colors">
                    开始练习
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>