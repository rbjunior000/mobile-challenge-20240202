import { supabase } from '../supabase'
import { FavoritesService } from './types'

export const favoritesService: FavoritesService = {
  favorite: async ({ user_id, word_id }) => {
    await supabase.from('favorites').insert({
      user_id,
      word_id
    })

    return true
  },
  paginated: async ({ limit = 10, offset = 0 }) => {
    const { data, count } = await supabase
      .from('favorites')
      .select(
        `
      id,
      words ( id, name )
      `
      )
      .range(offset, limit)
    return {
      data: data || [],
      hasMore: offset + limit < (count || 0),
      total: count as number
    }
  },
  remove: async ({ id }) => {
    const asd = await supabase.from('favorites').delete().eq('word_id', id).select()
    return true
  }
}
