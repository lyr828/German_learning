<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Headphones, BookOpen, PenTool, Mic, TrendingUp, Target, Award } from 'lucide-vue-next'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ModuleCard from '@/components/ModuleCard.vue'
import ProgressRing from '@/components/ProgressRing.vue'
import { getProgress } from '@/utils/storage'

const progress = ref(getProgress())

const totalProgress = computed(() => {
  const completed = progress.value.listening.completed + 
                   progress.value.reading.completed + 
                   progress.value.writing.completed + 
                   progress.value.speaking.completed
  const total = progress.value.listening.total + 
               progress.value.reading.total + 
               progress.value.writing.total + 
               progress.value.speaking.total
  return Math.round((completed / total) * 100)
})

const todayGoal = ref(0)
const goalProgress = computed(() => Math.min(100, todayGoal.value * 20))

onMounted(() => {
  const today = new Date().toDateString()
  const savedGoal = localStorage.getItem('todayGoal')
  const savedDate = localStorage.getItem('todayGoalDate')
  
  if (savedDate === today && savedGoal) {
    todayGoal.value = parseInt(savedGoal)
  } else {
    todayGoal.value = 0
    localStorage.setItem('todayGoalDate', today)
  }
})

function incrementGoal() {
  if (todayGoal.value < 5) {
    todayGoal.value++
    localStorage.setItem('todayGoal', todayGoal.value.toString())
  }
}

const modules = computed(() => [
  {
    title: '听力',
    description: '通过歌德和德福真题练习，提升听力理解能力',
    icon: Headphones,
    path: '/listening',
    progress: Math.round((progress.value.listening.completed / progress.value.listening.total) * 100),
    score: progress.value.listening.score
  },
  {
    title: '阅读',
    description: '阅读真题练习，提升阅读理解和答题技巧',
    icon: BookOpen,
    path: '/reading',
    progress: Math.round((progress.value.reading.completed / progress.value.reading.total) * 100),
    score: progress.value.reading.score
  },
  {
    title: '写作',
    description: '写作题目练习，掌握作文结构和表达技巧',
    icon: PenTool,
    path: '/writing',
    progress: Math.round((progress.value.writing.completed / progress.value.writing.total) * 100),
    score: progress.value.writing.score
  },
  {
    title: '口语',
    description: '口语话题练习，提升表达流利度和准确性',
    icon: Mic,
    path: '/speaking',
    progress: Math.round((progress.value.speaking.completed / progress.value.speaking.total) * 100),
    score: progress.value.speaking.score
  }
])
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />
    
    <main class="flex-1">
      <section class="bg-gradient-to-br from-[#003366] via-[#004488] to-[#0055AA] text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="text-center lg:text-left mb-8 lg:mb-0">
              <h1 class="text-4xl md:text-5xl font-bold mb-4">
                德语 B2 学习平台
              </h1>
              <p class="text-lg text-white/80 mb-6">
                专为备考歌德和德福考试设计，一站式提升您的德语能力
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/listening" class="px-6 py-3 bg-[#DAA520] text-[#003366] font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                  开始学习
                </a>
                <a href="/vocabulary" class="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                  词汇库
                </a>
              </div>
            </div>
            <div class="flex-shrink-0">
              <ProgressRing :progress="totalProgress" :size="160" :stroke-width="12" />
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-8 bg-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <Target class="w-6 h-6 text-[#DAA520]" />
                <h2 class="text-lg font-semibold text-gray-800">今日学习目标</h2>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">{{ todayGoal }}/5</span>
                <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-[#DAA520] rounded-full transition-all duration-500"
                    :style="{ width: goalProgress + '%' }"
                  ></div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex space-x-2">
              <button 
                v-for="i in 5" 
                :key="i"
                @click="incrementGoal"
                :class="[
                  'w-10 h-10 rounded-lg font-bold text-lg transition-all duration-300',
                  i <= todayGoal 
                    ? 'bg-[#003366] text-white' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                ]"
              >
                {{ i }}
              </button>
              <span class="ml-4 self-center text-sm text-gray-500">点击标记完成的学习任务</span>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-[#003366] mb-2">学习板块</h2>
            <p class="text-gray-600">选择您想练习的板块，开始提升德语能力</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModuleCard 
              v-for="module in modules"
              :key="module.path"
              v-bind="module"
            />
          </div>
        </div>
      </section>
      
      <section class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-[#003366] mb-2">学习统计</h2>
            <p class="text-gray-600">追踪您的学习进度和成就</p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl shadow-md p-6 text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp class="w-6 h-6 text-blue-600" />
              </div>
              <div class="text-3xl font-bold text-[#003366]">{{ progress.vocabulary.mastered }}</div>
              <div class="text-sm text-gray-500">已掌握词汇</div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 text-center">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award class="w-6 h-6 text-green-600" />
              </div>
              <div class="text-3xl font-bold text-[#003366]">
                {{ Math.round((progress.listening.score + progress.reading.score + progress.writing.score + progress.speaking.score) / 4) }}
              </div>
              <div class="text-sm text-gray-500">平均分数</div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 text-center">
              <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target class="w-6 h-6 text-yellow-600" />
              </div>
              <div class="text-3xl font-bold text-[#003366]">
                {{ progress.listening.completed + progress.reading.completed + progress.writing.completed + progress.speaking.completed }}
              </div>
              <div class="text-sm text-gray-500">已完成题目</div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 text-center">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen class="w-6 h-6 text-purple-600" />
              </div>
              <div class="text-3xl font-bold text-[#003366]">4</div>
              <div class="text-sm text-gray-500">学习板块</div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>