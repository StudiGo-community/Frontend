export const formatDateParts = (
  input: string
): { date: string; time: string } => {
  const dateObject = new Date(input)
  if (Number.isNaN(dateObject.getTime())) return { date: '', time: '' }

  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  const hour = String(dateObject.getHours()).padStart(2, '0')
  const minute = String(dateObject.getMinutes()).padStart(2, '0')

  return { date: `${year}.${month}.${day}`, time: `${hour}:${minute}` }
}

export const getKoreaStandardTimeNow = () => {
  const now = new Date()
  const localOffsetMilliseconds = now.getTimezoneOffset() * 60_000
  const coordinatedUniversalTimeMilliseconds =
    now.getTime() + localOffsetMilliseconds
  const koreaStandardTimeMilliseconds =
    coordinatedUniversalTimeMilliseconds + 9 * 60 * 60_000

  return new Date(koreaStandardTimeMilliseconds)
}

export const startOfKoreaStandardTimeDay = () => {
  const dateObject = getKoreaStandardTimeNow()
  dateObject.setHours(0, 0, 0, 0)
  return dateObject
}

export const addDays = (baseDate: Date, offsetDays: number) => {
  const dateObject = new Date(baseDate)
  dateObject.setDate(baseDate.getDate() + offsetDays)
  return dateObject
}

export const toYearMonthDay = (dateObject: Date) => {
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const toMonthDay = (dateObject: Date) => {
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  return `${month}.${day}`
}

export const toKoreanDay = (dateObject: Date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'] as const
  return days[dateObject.getDay()]
}
