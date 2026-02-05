/**
 * @param date - Date object or date string
 * @returns Formatted date string in 'yyyy.mm.dd AM/PM hh.mm' format
 */
export const formatCommunityDate = (date: Date | string | number) => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')

  const hours = d.getHours()
  const minutes = String(d.getMinutes()).padStart(2, '0')

  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = String(hours % 12 || 12).padStart(2, '0')

  return `${year}.${month}.${day} ${ampm} ${displayHours}.${minutes}`
}
