export const AUTH_JOIN_QUERY_KEYS = {
  emailCheck: (email: string) => ['auth-join', 'email-check', email] as const,
  emailSendCode: (email: string) =>
    ['auth-join', 'email-send-code', email] as const,
  emailVerifyCode: (email: string) =>
    ['auth-join', 'email-verify-code', email] as const,
  nicknameCheck: (nickname: string) =>
    ['auth-join', 'nickname-check', nickname] as const,
  signupEmail: () => ['auth-join', 'signup-email'] as const,
}
