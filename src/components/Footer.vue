<script setup lang="ts">
import { BookOpen, Mail, Phone, MapPin } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-[#003366] text-white py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <BookOpen class="w-8 h-8 text-[#DAA520]" />
            <span class="text-xl font-bold">Deutsch Lernen</span>
          </div>
          <p class="text-gray-300 text-sm">专为备考歌德和德福考试的德语学习者设计的综合性学习平台。</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#DAA520]">快速链接</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/" class="text-gray-300 hover:text-white transition-colors">首页</a></li>
            <li><a href="/listening" class="text-gray-300 hover:text-white transition-colors">听力</a></li>
            <li><a href="/reading" class="text-gray-300 hover:text-white transition-colors">阅读</a></li>
            <li><a href="/writing" class="text-gray-300 hover:text-white transition-colors">写作</a></li>
            <li><a href="/speaking" class="text-gray-300 hover:text-white transition-colors">口语</a></li>
            <li><a href="/vocabulary" class="text-gray-300 hover:text-white transition-colors">词汇库</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4 text-[#DAA520]">联系我们</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center space-x-2 text-gray-300">
              <Mail class="w-4 h-4" />
              <span>contact@deutschlernen.com</span>
            </li>
            <li class="flex items-center space-x-2 text-gray-300">
              <Phone class="w-4 h-4" />
              <span>+49 123 456 7890</span>
            </li>
            <li class="flex items-center space-x-2 text-gray-300">
              <MapPin class="w-4 h-4" />
              <span>Berlin, Deutschland</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 Deutsch Lernen. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </footer>
</template>