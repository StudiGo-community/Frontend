import { useMutation } from '@tanstack/react-query'
import { postKakaoOAuth } from './oauth'

export const useKakaoOAuthMutation = () =>
  useMutation({
    mutationFn: postKakaoOAuth,
  })
