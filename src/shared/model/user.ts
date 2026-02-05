export interface User {
  id: number
  email: string
  nickname: string
  name: string
  profileImageUrl: string | null
  gender: 'M' | 'F' | null
  birthday: string | null
  phone: string | null
  role: 'USER' | 'STAFF' | 'ADMIN'
  createdAt: Date
}

// 제가 커뮤니티에 Post랑은 살짝 다른 방식으로 해봤어요.
// 설명을 덧붙이자면, 이건 타입을 먼저 선언을 하고 스키마를 변환해서 여기에 끼워 맞춰요.
// 원래 방식은 스키마를 변환해서 거기에서 타입을 추출하는 방식이구요.

/**
 *
 *
 *
 *
 *
 */
