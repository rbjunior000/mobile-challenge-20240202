import { PaginatedInput, Word } from '../words'

export type History = {
  id: number
  words: Word | null
}

export type SaveHistoryInput = {
  word_id: string
  user_id: string
}

export type HistoryService = {
  recents: (input: PaginatedInput) => Promise<History[]>
  save: (input: SaveHistoryInput) => Promise<History>
}
