type UserRole = 'user' | 'admin' | 'instructor'

export function formatJoinedAt(createdAt: string | undefined): string {
  if (!createdAt) return ''
  const datePart = createdAt.split('T')[0] ?? ''
  const [year, month, day] = datePart.split('-')
  if (!year || !month || !day) return ''
  return `${year}.${month}.${day}`
}

export function mapUserRoleToUiRole(role: string | undefined): UserRole {
  if (!role) return 'user'
  const normalizedRole = role.toLowerCase()
  if (normalizedRole === 'admin') return 'admin'
  if (normalizedRole === 'instructor') return 'instructor'
  return 'user'
}

export type { UserRole }
