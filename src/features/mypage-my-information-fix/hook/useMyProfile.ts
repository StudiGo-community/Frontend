import { useQuery } from '@tanstack/react-query'
import { mypageKeys } from '@/shared/api/query-keys'
import { getMyProfileApi } from '@/entities/mypage-my-information-fix/api/profile-fix-api'

export function useMyProfile() {
  return useQuery({
    queryKey: mypageKeys.profile(),
    queryFn: getMyProfileApi,
  })
}
