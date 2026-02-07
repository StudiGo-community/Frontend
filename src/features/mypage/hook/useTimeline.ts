import { useQuery } from '@tanstack/react-query'
import { getTimelineHistoryApi } from '@/entities/mypage/api/timeline-api'
import type { TimelineHistoryResponse } from '@/entities/mypage/model/timeline-schema'
import { mypageKeys } from '@/shared/api/query-keys'

export const useTimelineHistory = (enabled: boolean) => {
  return useQuery<TimelineHistoryResponse>({
    queryKey: mypageKeys.timeline(),
    queryFn: getTimelineHistoryApi,
    enabled,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })
}
