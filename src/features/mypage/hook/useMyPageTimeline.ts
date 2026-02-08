import { useEffect, useMemo, useRef } from 'react'
import { toast } from 'sonner'

import { useTimelineHistory } from '@/features/mypage/hook/useTimeline'
import {
  addDays,
  startOfKoreaStandardTimeDay,
  toKoreanDay,
  toMonthDay,
  toYearMonthDay,
} from '@/features/mypage/lib/data-kst'
import type { TimelineItem } from '@/features/mypage/ui/TimeLine'

export function useMyPageTimeline(isClientEnvironment: boolean) {
  const timelineHistoryQuery = useTimelineHistory(isClientEnvironment)

  const hasShownNoHistoryToastRef = useRef(false)

  useEffect(() => {
    if (!timelineHistoryQuery.isSuccess) {
      return
    }

    if (hasShownNoHistoryToastRef.current) {
      return
    }

    const historyResults = timelineHistoryQuery.data?.results ?? []

    if (historyResults.length === 0) {
      hasShownNoHistoryToastRef.current = true
      toast('아직 출석 기록이 없습니다')
    }
  }, [timelineHistoryQuery.isSuccess, timelineHistoryQuery.data?.results])

  const timelineItems = useMemo<TimelineItem[]>(() => {
    const todayDate = startOfKoreaStandardTimeDay()
    const historyResults = timelineHistoryQuery.data?.results ?? []

    const submittedDateMap = new Map<string, boolean>()
    for (const historyItem of historyResults) {
      submittedDateMap.set(historyItem.date, Boolean(historyItem.is_submitted))
    }

    const items: TimelineItem[] = []

    for (let dayOffset = -3; dayOffset <= 3; dayOffset += 1) {
      const currentDate = addDays(todayDate, dayOffset)
      const yearMonthDay = toYearMonthDay(currentDate)
      const isSubmitted = submittedDateMap.get(yearMonthDay) ?? false

      let status: TimelineItem['status'] = 'upcoming'

      if (dayOffset > 0) {
        status = 'upcoming'
      } else if (dayOffset === 0) {
        status = isSubmitted ? 'done' : 'go'
      } else {
        status = isSubmitted ? 'done' : 'fail'
      }

      items.push({
        date: toMonthDay(currentDate),
        day: toKoreanDay(currentDate),
        status,
      })
    }

    return items
  }, [timelineHistoryQuery.data?.results])

  return { timeline: timelineItems }
}
