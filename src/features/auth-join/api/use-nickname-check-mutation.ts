'use client'

import { useMutation } from '@tanstack/react-query'
import { checkNickname } from '@/features/auth-join/api/nickname-api'
import { AUTH_JOIN_QUERY_KEYS } from '@/features/auth-join/api/query-keys'
import type { NicknameCheckResponse } from '@/features/auth-join/api/nickname-api'

export const useNicknameCheckMutation = (nickname: string) => {
  return useMutation<NicknameCheckResponse, unknown, void>({
    mutationKey: AUTH_JOIN_QUERY_KEYS.nicknameCheck(nickname),
    mutationFn: async () => checkNickname(nickname),
  })
}
