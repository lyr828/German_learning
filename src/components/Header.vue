<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, Menu, X } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '听力', path: '/listening' },
  { name: '阅读', path: '/reading' },
  { name: '写作', path: '/writing' },
  { name: '口语', path: '/speaking' },
  { name: '词汇库', path: '/vocabulary' },
]

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/')
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function navigate(path: string) {
  router.push(path)
  isMenuOpen.value = false
}
</script>

<template>
  <header class="bg-gradient-to-r from-[#003366] to-[#0055AA] text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigate('/')">
          <BookOpen class="w-8 h-8 text-[#DAA520]" />
          <span class="text-xl font-bold">Deutsch Lernen</span>
        </div>
        
        <nav class="hidden md:flex space-x-8">
          <button
            v-for="item in navItems"
            :key="item.path"
            @click="navigate(item.path)"
            :class="[
              'px-3 py-2 rounded-lg font-medium transition-all duration-300',
              isActive(item.path) 
                ? 'bg-[#DAA520] text-[#003366]' 
                : 'hover:bg-white/10 text-white'
            ]"
          >
            {{ item.name }}
          </button>
        </nav>
        
        <button 
          class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          @click="toggleMenu"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
      
      <div 
        v-if="isMenuOpen"
        class="md:hidden pb-4 space-y-2"
      >
        <button
          v-for="item in navItems"
          :key="item.path"
          @click="navigate(item.path)"
          :class="[
            'block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300',
            isActive(item.path) 
              ? 'bg-[#DAA520] text-[#003366]' 
              : 'hover:bg-white/10 text-white'
          ]"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </header>
</template>