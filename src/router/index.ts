import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ListeningPage from '@/pages/ListeningPage.vue'
import ListeningQuiz from '@/pages/ListeningQuiz.vue'
import ReadingPage from '@/pages/ReadingPage.vue'
import ReadingQuiz from '@/pages/ReadingQuiz.vue'
import WritingPage from '@/pages/WritingPage.vue'
import WritingQuiz from '@/pages/WritingQuiz.vue'
import SpeakingPage from '@/pages/SpeakingPage.vue'
import SpeakingQuiz from '@/pages/SpeakingQuiz.vue'
import VocabularyPage from '@/pages/VocabularyPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/listening',
    name: 'listening',
    component: ListeningPage,
  },
  {
    path: '/listening/:id',
    name: 'listening-quiz',
    component: ListeningQuiz,
  },
  {
    path: '/reading',
    name: 'reading',
    component: ReadingPage,
  },
  {
    path: '/reading/:id',
    name: 'reading-quiz',
    component: ReadingQuiz,
  },
  {
    path: '/writing',
    name: 'writing',
    component: WritingPage,
  },
  {
    path: '/writing/:id',
    name: 'writing-quiz',
    component: WritingQuiz,
  },
  {
    path: '/speaking',
    name: 'speaking',
    component: SpeakingPage,
  },
  {
    path: '/speaking/:id',
    name: 'speaking-quiz',
    component: SpeakingQuiz,
  },
  {
    path: '/vocabulary',
    name: 'vocabulary',
    component: VocabularyPage,
  },
]

const router = createRouter({
  history: createWebHistory('/German_learning/'),
  routes,
})

export default router