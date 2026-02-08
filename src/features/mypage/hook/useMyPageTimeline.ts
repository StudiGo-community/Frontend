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

export function useMyPageTimeline(isClient: boolean) {
  const timelineHistoryQuery = useTimelineHistory(isClient)

  const noHistoryToastOnceRef = useRef(false)
  useEffect(() => {
    if (!timelineHistoryQuery.isSuccess) return
    if (noHistoryToastOnceRef.current) return

    const results = timelineHistoryQuery.data?.results ?? []
    if (results.length === 0) {
      noHistoryToastOnceRef.current = true
      toast('아직 출석 기록이 없습니다')
    }
  }, [timelineHistoryQuery.isSuccess, timelineHistoryQuery.data?.results])

  const timeline = useMemo<TimelineItem[]>(() => {
    const today = startOfKoreaStandardTimeDay()
    const results = timelineHistoryQuery.data?.results ?? []

    const submittedMap = new Map<string, boolean>()
    for (const r of results) submittedMap.set(r.date, !!r.is_submitted)

    const items: TimelineItem[] = []
    for (let d = -3; d <= 3; d += 1) {
      const dateObject = addDays(today, d)
      const ymd = toYearMonthDay(dateObject)
      const submitted = submittedMap.get(ymd) ?? false

      let status: TimelineItem['status'] = 'upcoming'
      if (d > 0) status = 'upcoming'
      else if (d === 0) status = submitted ? 'done' : 'go'
      else status = submitted ? 'done' : 'fail'

      items.push({
        date: toMonthDay(dateObject),
        day: toKoreanDay(dateObject),
        status,
      })
    }
    return items
  }, [timelineHistoryQuery.data?.results])

  return { timeline }
}
