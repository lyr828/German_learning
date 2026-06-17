<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, Search, Filter, Star } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import VocabCard from '@/components/VocabCard.vue'
import { vocabularyList } from '@/data/vocabulary'
import { getFavorites } from '@/utils/storage'

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedPartOfSpeech = ref('all')
const showFavorites = ref(false)

const categories = ['all', '日常', '学习', '工作', '旅行', '商务', '文化', '科技']
const partsOfSpeech = ['all', 'noun', 'verb', 'adjective', 'adverb', 'preposition']

const filteredVocab = computed(() => {
  let result = vocabularyList
  
  if (showFavorites.value) {
    const favorites = getFavorites()
    result = result.filter(v => favorites.includes(v.id))
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(v => 
      v.word.toLowerCase().includes(query) || 
      v.meaning.toLowerCase().includes(query)
    )
  }
  
  if (selectedCategory.value !== 'all') {
    result = result.filter(v => v.category === selectedCategory.value)
  }
  
  if (selectedPartOfSpeech.value !== 'all') {
    result = result.filter(v => v.partOfSpeech === selectedPartOfSpeech.value)
  }
  
  return result
})

function goBack() {
  router.push('/')
}

function getPartOfSpeechLabel(pos: string): string {
  const labels: Record<string, string> = {
    all: '全部词性',
    noun: '名词',
    verb: '动词',
    adjective: '形容词',
    adverb: '副词',
    preposition: '介词'
  }
  return labels[pos] || pos
}

function handleMaster(id: string) {
  console.log('Mastered:', id)
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
            <h1 class="text-2xl md:text-3xl font-bold">词汇库</h1>
            <div class="w-20"></div>
          </div>
        </div>
      </section>
      
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="flex-1 relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="搜索词汇或中文意思..."
                  class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>
              
              <button 
                @click="showFavorites = !showFavorites"
                :class="[
                  'px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2',
                  showFavorites 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                <Star class="w-5 h-5" :fill="showFavorites ? 'currentColor' : 'none'" />
                <span>收藏列表</span>
              </button>
            </div>
            
            <div class="mt-6 flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-3">
                  <Filter class="w-4 h-4 text-gray-400" />
                  <span class="text-sm font-medium text-gray-600">分类</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="category in categories"
                    :key="category"
                    @click="selectedCategory = category"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      selectedCategory === category 
                        ? 'bg-[#003366] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                  >
                    {{ category === 'all' ? '全部' : category }}
                  </button>
                </div>
              </div>
              
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-3">
                  <Filter class="w-4 h-4 text-gray-400" />
                  <span class="text-sm font-medium text-gray-600">词性</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="pos in partsOfSpeech"
                    :key="pos"
                    @click="selectedPartOfSpeech = pos"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      selectedPartOfSpeech === pos 
                        ? 'bg-[#003366] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ]"
                  >
                    {{ getPartOfSpeechLabel(pos) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="py-8 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-[#003366]">
              {{ showFavorites ? '我的收藏' : '词汇列表' }}
            </h2>
            <span class="text-sm text-gray-500">共 {{ filteredVocab.length }} 个词汇</span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VocabCard 
              v-for="vocab in filteredVocab"
              :key="vocab.id"
              :vocab="vocab"
              @master="handleMaster"
            />
          </div>
          
          <div 
            v-if="filteredVocab.length === 0"
            class="text-center py-12"
          >
            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-gray-500">没有找到匹配的词汇</p>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>
</template>