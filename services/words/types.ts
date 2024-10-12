export type Word = {
  name: string
  id: number
}

export type PaginatedInput = {
  offset: number
  limit: number
}

export type PaginatedOutput<T> = {
  data: T[]
  total: number
  hasMore: boolean
}

type DetailsInput = {
  name: string
}

type Definitions = {
  definition: string
  example: string
}
export type Meanings = {
  partOfSpeech: 'exclamation' | 'noun' | 'verb'
  definitions: Definitions[]
}

export type DetailsOutput = {
  phonetic: string
  phonetics: {
    text: string
    audio: string
  }[]
  meanings: Meanings[]
}
export type WordsService = {
  paginated: (input: PaginatedInput) => Promise<PaginatedOutput<Word>>
  details: (input: DetailsInput) => Promise<DetailsOutput[]>
}
