import { useMutation } from '@tanstack/react-query'
import { postKakaoOAuth } from '@/features/auth/api/endpoints/oauth'

export const useKakaoOAuthMutation = () =>
  useMutation({
    mutationFn: postKakaoOAuth,
  })
