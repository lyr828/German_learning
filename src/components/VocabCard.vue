<script setup lang="ts">
import { ref } from 'vue'
import { Star, Volume2, Check } from 'lucide-vue-next'
import { isFavorite, toggleFavorite } from '@/utils/storage'
import type { Vocabulary } from '@/types'

const props = defineProps<{
  vocab: Vocabulary
}>()

const emit = defineEmits<{
  (e: 'master', id: string): void
}>()

const isFav = ref(isFavorite(props.vocab.id))
const isMastered = ref(false)

function getPartOfSpeechLabel(pos: string): string {
  const labels: Record<string, string> = {
    noun: '名词',
    verb: '动词',
    adjective: '形容词',
    adverb: '副词',
    preposition: '介词'
  }
  return labels[pos] || pos
}

function getPartOfSpeechColor(pos: string): string {
  const colors: Record<string, string> = {
    noun: 'bg-blue-100 text-blue-700',
    verb: 'bg-green-100 text-green-700',
    adjective: 'bg-yellow-100 text-yellow-700',
    adverb: 'bg-purple-100 text-purple-700',
    preposition: 'bg-red-100 text-red-700'
  }
  return colors[pos] || 'bg-gray-100 text-gray-700'
}

function handleFavorite() {
  isFav.value = toggleFavorite(props.vocab.id)
}

function handleMaster() {
  isMastered.value = !isMastered.value
  emit('master', props.vocab.id)
}

function speak() {
  const utterance = new SpeechSynthesisUtterance(props.vocab.word)
  utterance.lang = 'de-DE'
  speechSynthesis.speak(utterance)
}
</script>

<template>
  <div 
    :class="[
      'bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden',
      isMastered ? 'border-2 border-green-500' : 'border border-gray-100'
    ]"
  >
    <div class="p-5">
      <div class="flex items-start justify-between mb-3">
        <div>
          <h3 class="text-xl font-bold text-[#003366]">{{ vocab.word }}</h3>
          <span class="text-sm text-gray-400">{{ vocab.phonetic }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="speak"
            class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <Volume2 class="w-4 h-4" />
          </button>
          <button 
            @click="handleFavorite"
            class="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            :class="isFav ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400 hover:bg-yellow-50 hover:text-yellow-500'"
          >
            <Star class="w-4 h-4" :fill="isFav ? 'currentColor' : 'none'" />
          </button>
        </div>
      </div>
      
      <div class="flex items-center space-x-2 mb-3">
        <span :class="['px-2 py-1 rounded text-xs font-medium', getPartOfSpeechColor(vocab.partOfSpeech)]">
          {{ getPartOfSpeechLabel(vocab.partOfSpeech) }}
        </span>
        <span class="text-lg text-gray-800">{{ vocab.meaning }}</span>
      </div>
      
      <div class="bg-gray-50 rounded-lg p-3 mb-4">
        <p class="text-gray-700 italic">{{ vocab.example.de }}</p>
        <p class="text-gray-500 text-sm mt-1">{{ vocab.example.zh }}</p>
      </div>
      
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-400">{{ vocab.category }}</span>
        <button 
          @click="handleMaster"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2',
            isMastered 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
          ]"
        >
          <Check class="w-4 h-4" />
          <span>{{ isMastered ? '已掌握' : '标记掌握' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>