import { History, historyService, SaveHistoryInput } from '@/services'
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useHistory = ({ enable }: { enable?: boolean } = {}) => {
  const queryClient = useQueryClient()
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['history'],
    queryFn: ({ pageParam = 0 }) => historyService.recents({ offset: pageParam, limit: 50 }),
    getNextPageParam: (lastPage, pages) => {
      return pages.length * 50
    },
    initialPageParam: 0,
    enabled: enable
  })

  const saveHistory = useMutation({
    mutationFn: (input: SaveHistoryInput) => historyService.save(input),
    onSuccess: (newHistory: History) => {
      queryClient.setQueryData(['history'], (oldData: InfiniteData<History[], unknown> | undefined) => {
        if (!oldData) {
          return {
            pages: [[newHistory]],
            pageParams: [0]
          }
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page, index: number) => {
            if (index === 0) {
              return [newHistory, ...page]
            }
            return page
          })
        }
      })
    }
  })

  return { data, fetchNextPage, hasNextPage, isLoading, saveHistory: saveHistory.mutate }
}
