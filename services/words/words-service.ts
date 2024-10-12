import { supabase } from '../supabase'
import { DetailsOutput, WordsService } from './types'

export const wordsService: WordsService = {
  details: async ({ name }) => {
    const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`, { method: 'GET' })
    if (!result.ok) {
      throw new Error(`Couldnt process the word ${name}`)
    }
    const response = (await result.json()) as DetailsOutput[]
    return response
  },
  paginated: async ({ limit = 10, offset = 0 }) => {
    const { data, count } = await supabase
      .from('words')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)

    return {
      data: data?.map(({ name, id }) => ({ name: name as string, id: id as number })) || [],
      total: count || 0,
      hasMore: offset + limit < (count || 0)
    }
  }
}
