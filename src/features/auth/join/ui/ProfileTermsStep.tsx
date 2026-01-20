'use client'

import type { AgreeKey, JoinFormState } from './JoinFunnel'

export function ProfileTermsStep(_props: {
  value: JoinFormState
  onChange: (p: Partial<JoinFormState>) => void
  onToggleAgree: (k: AgreeKey, v: boolean) => void
}) {
  return null
}
