import { http, HttpResponse } from 'msw'

interface LoginRequestBody {
  email: string
  password: string
}

export const authHandlers = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    async ({ request }) => {
      const body = (await request.json()) as LoginRequestBody

      if (body.password === 'stydigo10!') {
        return HttpResponse.json({
          access_token: 'MOCK_ACCESS_TOKEN_STYDIGO',
          token_type: 'Bearer',
          expires_in: 3600,
          user: {
            id: 12345,
            email: body.email,
            nickname: '스터디고유저',
            name: '홍길동',
            profile_image_url: 'https://picsum.photos/200',
            role: 'USER',
            status: 'ACTIVE',
            provider: 'EMAIL',
          },
        })
      }

      if (body.password === 'blocked10!') {
        return HttpResponse.json(
          {
            error_code: 'LOGIN_BLOCKED',
            error_detail:
              '로그인 시도 횟수를 초과했습니다. 10분 후 다시 시도해주세요.',
            retry_after: 600,
          },
          { status: 429 }
        )
      }

      if (body.password === 'withdrawn10!') {
        return HttpResponse.json(
          {
            error_code: 'ACCOUNT_WITHDRAWN',
            error_detail: '탈퇴한 계정입니다.',
            can_restore: true,
            restore_deadline: '2026-02-08T10:30:00Z',
          },
          { status: 403 }
        )
      }

      return HttpResponse.json(
        {
          detail: '이메일 또는 비밀번호를 확인해주세요.',
        },
        { status: 401 }
      )
    }
  ),

  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/kakao`, () => {
    return HttpResponse.json({
      access_token: 'MOCK_KAKAO_TOKEN',
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: 54321,
        email: 'kakao@example.com',
        nickname: '카카오유저',
        name: '김카카오',
        profile_image_url: null,
        role: 'USER',
        status: 'ACTIVE',
        provider: 'KAKAO',
      },
    })
  }),

  http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, () => {
    return HttpResponse.json({
      access_token: 'REFRESHED_MOCK_TOKEN',
      token_type: 'Bearer',
      expires_in: 3600,
    })
  }),
]
