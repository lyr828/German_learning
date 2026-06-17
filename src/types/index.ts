export interface Question {
  id: string
  question: string
  context?: string
  options?: string[]
  correctAnswer: string
}

export interface ListeningQuestion {
  id: string
  title: string
  description: string
  examType: 'goethe' | 'daf'
  difficulty: number
  duration: number
  questions: Question[]
}

export interface ReadingQuestion {
  id: string
  title: string
  description: string
  examType: 'goethe' | 'daf'
  difficulty: number
  duration: number
  passage?: string
  questions: Question[]
}

export interface WritingQuestion {
  id: string
  title: string
  description: string
  examType: 'goethe' | 'daf'
  difficulty: number
  duration: number
  wordCount: number
  prompt: string
  requirements: string[]
}

export interface SpeakingPart {
  type: string
  preparationTime: number
  speakingTime: number
  prompt: string
  notes?: string[]
}

export interface SpeakingQuestion {
  id: string
  title: string
  description: string
  examType: 'goethe' | 'daf'
  difficulty: number
  duration: number
  parts: SpeakingPart[]
}

export interface Vocabulary {
  id: string
  word: string
  phonetic: string
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition'
  meaning: string
  example: { de: string; zh: string }
  category: string
}

export interface ModuleProgress {
  completed: number
  total: number
  score: number
}

export interface VocabularyProgress {
  mastered: number
  total: number
}

export interface UserProgress {
  listening: ModuleProgress
  reading: ModuleProgress
  writing: ModuleProgress
  speaking: ModuleProgress
  vocabulary: VocabularyProgress
}

export interface ExamResult {
  id: string
  type: 'listening' | 'reading' | 'writing' | 'speaking'
  score: number
  date: string
  time: number
}