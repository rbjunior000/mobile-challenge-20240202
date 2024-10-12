import { supabase } from '../supabase'
import { History, HistoryService } from './types'

export const historyService: HistoryService = {
  recents: async ({ limit, offset }) => {
    const { data, count } = await supabase
      .from('history')
      .select(
        `
    id,
    words ( id, name )
    `
      )
      .range(0, 50)

    return data || []
  },
  save: async ({ user_id, word_id }) => {
    const { data } = await supabase
      .from('history')
      .upsert({
        user_id,
        word_id: Number(word_id)
      })
      .select(
        `
      id,
      words ( id, name )
      `
      )

    const result = data as History[]

    return {
      id: result[0]?.id,
      words: result[0].words
    }
  }
}
