import { Word } from '@/services'
import { create } from 'zustand'

type WordDetailsStore = {
  word: Word | null
  isOpen: boolean
  onOpen: (word: Word) => void
  onClose: () => void
}

export const useWordDetailsStore = create<WordDetailsStore>((set) => ({
  word: null,
  isOpen: false,

  onOpen: (word: Word) => set({ word, isOpen: true }),

  onClose: () => set({ isOpen: false, word: null })
}))
