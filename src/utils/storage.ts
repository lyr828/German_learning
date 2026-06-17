import type { UserProgress } from '@/types'

const STORAGE_KEY = 'deutsch-lernen-progress'
const FAVORITES_KEY = 'deutsch-lernen-favorites'

const defaultProgress: UserProgress = {
  listening: { completed: 0, total: 10, score: 0 },
  reading: { completed: 0, total: 10, score: 0 },
  writing: { completed: 0, total: 10, score: 0 },
  speaking: { completed: 0, total: 10, score: 0 },
  vocabulary: { mastered: 0, total: 170 }
}

export function getProgress(): UserProgress {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    return JSON.parse(saved)
  }
  return defaultProgress
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function updateProgress(module: 'listening' | 'reading' | 'writing' | 'speaking', score: number): void {
  const progress = getProgress()
  progress[module].completed++
  if (score > progress[module].score) {
    progress[module].score = score
  }
  saveProgress(progress)
}

export function getFavorites(): string[] {
  const saved = localStorage.getItem(FAVORITES_KEY)
  if (saved) {
    return JSON.parse(saved)
  }
  return []
}

export function isFavorite(id: string): boolean {
  const favorites = getFavorites()
  return favorites.includes(id)
}

export function toggleFavorite(id: string): boolean {
  const favorites = getFavorites()
  const index = favorites.indexOf(id)
  if (index > -1) {
    favorites.splice(index, 1)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    return false
  } else {
    favorites.push(id)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    return true
  }
}