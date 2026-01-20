'use client'

import * as React from 'react'

export interface StepProps {
  name: string
  children: React.ReactNode
}

export interface FunnelProps {
  children: Array<React.ReactElement<StepProps>>
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = React.useState(defaultStep)

  const Step = React.useCallback((props: StepProps): React.ReactElement => {
    return <>{props.children}</>
  }, [])

  const Funnel = React.useCallback(
    ({ children }: FunnelProps): React.ReactElement | null => {
      const target = children.find((child) => child.props.name === step)
      if (!target) return null
      return <>{target.props.children}</>
    },
    [step]
  )

  return { Funnel, Step, setStep, currentStep: step } as const
}
