import { useAuth } from '@/components'
import { favoritesService } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useFavorites = () => {
  const { user_id } = useAuth()
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesService.paginated({ limit: 100, offset: 0 })
  })
  const favoriteMutation = useMutation({
    mutationFn: (word_id: number) => favoritesService.favorite({ word_id, user_id }),
    onSuccess: () => refetch()
  })

  const unFavoriteMutation = useMutation({
    mutationFn: (id: number) => favoritesService.remove({ id }),
    onSuccess: () => refetch()
  })

  const favorite = (word_id: number) => {
    favoriteMutation.mutate(word_id)
  }

  const unFavorite = (id: number) => {
    unFavoriteMutation.mutate(id)
  }

  const isToogleFavorite = favoriteMutation.status === 'pending' || unFavoriteMutation.status === 'pending'

  return {
    favorite,
    unFavorite,
    data,
    isLoading,
    refetch,
    isToogleFavorite
  }
}
