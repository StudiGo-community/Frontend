import { useMutation } from '@tanstack/react-query'
import { postKakaoOAuth } from '@/features/auth-social/api/oauth'

export const useKakaoOAuthMutation = () =>
  useMutation({
    mutationFn: postKakaoOAuth,
  })
