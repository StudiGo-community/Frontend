export const POST_CATEGORIES = ['FREE', 'RECRUIT', 'STUDY'] as const

export const POST_CATEGORY_LABELS: Record<
  (typeof POST_CATEGORIES)[number],
  string
> = {
  FREE: '자유게시판',
  RECRUIT: '모집게시판',
  STUDY: '학습게시판',
}

export const POST_STATUS = ['ACTIVE', 'BLINDED', 'DELETED'] as const

export const TITLE_MAX_LENGTH = 100

export const URL_MAX_LENGTH = 255

export const REPORT_REASON_MAX_LENGTH = 100
