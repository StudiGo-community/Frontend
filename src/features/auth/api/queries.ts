import { useMutation } from '@tanstack/react-query'
import { postKakaoOAuth } from './endpoints/oauth'

export const useKakaoOAuthMutation = () =>
  useMutation({
    mutationFn: postKakaoOAuth,
  })
