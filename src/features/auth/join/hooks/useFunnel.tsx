'use client'

import { useCallback, useMemo, useState } from 'react'

export const useFunnel = <TStep extends string>(
  steps: readonly TStep[],
  defaultStep: TStep
) => {
  const [currentStep, setCurrentStep] = useState<TStep>(defaultStep)

  const currentIndex = useMemo(
    () => steps.indexOf(currentStep),
    [currentStep, steps]
  )

  const next = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }, [currentIndex, steps])

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }, [currentIndex, steps])

  const setStep = useCallback((step: TStep) => {
    setCurrentStep(step)
  }, [])

  return {
    currentStep,
    setStep,
    next,
    prev,
    steps,
  } as const
}
