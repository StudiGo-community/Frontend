'use client'

import type { ReactElement, ReactNode } from 'react'

export interface StepProps {
  name: string
  children: ReactNode
}

export interface FunnelProps {
  step: string
  children: Array<ReactElement<StepProps>>
}

export function Step({ children }: StepProps): ReactElement {
  return <>{children}</>
}

export function Funnel({ step, children }: FunnelProps): ReactElement | null {
  const target = children.find((child) => child.props.name === step)
  if (!target) return null
  return <>{target.props.children}</>
}
