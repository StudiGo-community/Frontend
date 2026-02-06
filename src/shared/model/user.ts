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

/**
 * 제가 커뮤니티에 Post랑은 살짝 다른 방식으로 해봤어요.
 * 설명을 덧붙이자면, 이건 타입을 먼저 선언을 하고 스키마를 변환해서 여기에 끼워 맞춰요.
 * 원래 방식은 스키마를 변환해서 거기에서 타입을 추출하는 방식이구요.
 * 사실 큰 차이는 없긴한데, 뭐가 먼저냐, 어디에 초점을 맞출거냐가 달라요.
 * 이건 백엔드에서 어떻게 주던 여기에 끼워맞출꺼야. 느낌이구요.
 * 스키마에서 추출하는 방식은 스키마가 바뀌면, 무조건 따라서 바뀌니까 거기에 휘둘리는 감이 있어요.
 *
 * 이 방법의 장점은 타입을 눈에 띄게 보기에 좋고, 스키마 파일은 지저분한 변환 과정 모음이라고 볼 수도 있어요.
 * 단점은 파일이 하나 더 늘어난다는 점이구요.
 * 정답이 뭔지까진 모르겠고, 선택의 여지가 있는 것 같아요.
 */
