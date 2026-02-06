export type WithdrawStep = 'GUIDE' | 'REASON' | 'VERIFY'

export type WithdrawalReason =
  | ''
  | 'LOW_USAGE'
  | 'NO_CONTENT'
  | 'OTHER_SERVICE'
  | 'PRIVACY_CONCERN'
  | 'DISSATISFACTION'
  | 'ETC'

export const REASON_LABEL: Record<Exclude<WithdrawalReason, ''>, string> = {
  LOW_USAGE: '사용 빈도가 낮아서',
  NO_CONTENT: '원하는 콘텐츠/기능이 없어서',
  OTHER_SERVICE: '다른 서비스 이용',
  PRIVACY_CONCERN: '개인정보 보호 우려',
  DISSATISFACTION: '서비스 불만족',
  ETC: '기타 (직접 입력)',
}
