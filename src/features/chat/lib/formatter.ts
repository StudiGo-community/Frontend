export const formatRelativeDateTime = (targetDate: Date) => {
  const now = new Date()
  const elapsedMs = Math.max(0, now.getTime() - targetDate.getTime())
  const elapsedSeconds = Math.floor(elapsedMs / 1000)
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const elapsedHours = Math.floor(elapsedMinutes / 60)
  const elapsedDays = Math.floor(elapsedHours / 24)

  if (elapsedSeconds < 60) return '방금 전'
  if (elapsedMinutes < 60) return `${elapsedMinutes}분 전`
  if (elapsedHours < 24) return `${elapsedHours}시간 전`
  if (elapsedDays < 7) return `${elapsedDays}일 전`
  return targetDate.toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
}

export const formatTimeString = (date: Date) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
