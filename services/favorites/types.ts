import { PaginatedInput, PaginatedOutput, Word } from '../words'

type FavoriteInput = {
  user_id: string
  word_id: number
}

export type Favorite = {
  id: number
  words: Word | null
}

export type FavoritesService = {
  favorite: (input: FavoriteInput) => Promise<boolean>
  paginated: (input: PaginatedInput) => Promise<PaginatedOutput<Favorite>>
  remove: (input: { id: number }) => Promise<boolean>
}
