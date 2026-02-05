import { useQuery } from '@tanstack/react-query'
import { getMyProfileApi } from '@/entities/mypage/api/profile-api'

export const useMyProfile = () => {
  return useQuery({
    queryKey: ['mypage', 'profile'],
    queryFn: getMyProfileApi,
  })
}
