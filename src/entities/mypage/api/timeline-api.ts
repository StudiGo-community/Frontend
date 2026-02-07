import { api } from '@/shared/api/client'
import {
  TimelineHistoryResponseSchema,
  type TimelineHistoryResponse,
} from '@/entities/mypage/model/timeline-schema'

export const getTimelineHistoryApi =
  async (): Promise<TimelineHistoryResponse> => {
    const res = await api.get<TimelineHistoryResponse>(
      '/daily-questions/history'
    )

    const parsed = TimelineHistoryResponseSchema.safeParse(res.data)
    if (!parsed.success) throw parsed.error

    return parsed.data
  }
