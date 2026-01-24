import { http, HttpResponse } from 'msw'

interface EmailLoginRequestBody {
  email: string
  password: string
  remember_me?: boolean
}

// 이메일
export const authHandlers = [
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    async ({ request }) => {
      const body = (await request.json()) as EmailLoginRequestBody

      if (body.password === 'studigo10!') {
        return HttpResponse.json({
          access_token: 'MOCK_ACCESS_TOKEN_FOR_EMAIL',
          token_type: 'Bearer',
          expires_in: 3600,
          user: {
            id: 1,
            email: body.email,
            nickname: '스터디고고',
          },
        })
      }

      if (body.password === 'blocked10!') {
        return HttpResponse.json(
          {
            error_code: 'LOGIN_BLOCKED',
            error_detail: '5회 이상 실패하여 30분간 로그인이 제한됩니다.',
          },
          { status: 403 }
        )
      }

      if (body.password === 'withdrawn10!') {
        return HttpResponse.json(
          {
            error_code: 'ACCOUNT_WITHDRAWN',
            error_detail: '이미 탈퇴 처리된 계정입니다.',
          },
          { status: 403 }
        )
      }

      if (body.password === 'banned10!') {
        return HttpResponse.json(
          {
            error_code: 'ACCOUNT_BANNED',
            error_detail: '이용이 제한된 계정입니다.',
          },
          { status: 403 }
        )
      }

      return HttpResponse.json(
        {
          error_code: 'INVALID_CREDENTIALS',
          error_detail: '이메일 또는 비밀번호가 일치하지 않습니다.',
        },
        { status: 401 }
      )
    }
  ),

  // 카카오
  http.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth/kakao`,
    async ({ request }) => {
      const body = (await request.json()) as {
        authorization_code: string
        redirect_uri: string
      }

      // 신규 회원
      if (body.authorization_code === 'NEW_USER') {
        return HttpResponse.json({
          is_new_user: true,
          requires_additional_info: true,
          temporary_token: 'TEMP_TOKEN_KAKAO_123',
          kakao_user_info: {
            email: 'kakao_user@kakao.com',
            nickname: 'kakao_newbie',
            profile_image_url: null,
          },
          missing_fields: ['phone', 'birthdate'],
        })
      }

      // 기존 회원
      return HttpResponse.json({
        is_new_user: false,
        access_token: 'ACCESS_TOKEN_MOCK_KAKAO',
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          id: 2,
          email: 'kakao_user@kakao.com',
          nickname: '카카오친구',
        },
      })
    }
  ),
]
