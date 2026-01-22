import { http, HttpResponse } from 'msw'

export const authHandlers = [
  http.post('http://localhost:3000/auth/oauth/kakao', async ({ request }) => {
    const body = (await request.json()) as {
      authorization_code: string
      redirect_uri: string
    }

    // 신규회원
    if (body.authorization_code === 'NEW_USER') {
      return HttpResponse.json(
        {
          is_new_user: true,
          requires_additional_info: true,
          temporary_token: 'TEMP_TOKEN_123',
          kakao_user_info: {
            email: 'kakao_user@kakao.com',
            nickname: 'kakao_Ab3Cd5',
            profile_image_url: 'blank',
          },
          missing_fields: ['phone', 'birthdate', 'gender'],
        },
        { status: 200 }
      )
    }

    // 기존회원
    return HttpResponse.json(
      {
        is_new_user: false,
        access_token: 'ACCESS_TOKEN_MOCK',
        refresh_token: 'REFRESH_TOKEN_MOCK',
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          id: 1,
          email: 'kakao_user@kakao.com',
          nickname: '카카오유저',
          profile_image_url: 'https://...',
          role: 'USER',
        },
      },
      { status: 200 }
    )
  }),
]
