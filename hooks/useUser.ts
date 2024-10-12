import { userService } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => userService.me()
  })

  return {
    user,
    isLoading
  }
}
