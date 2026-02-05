'use client'

import { ErrorInfo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Error from '@/shared/ui/Error'
import { Button } from '@/shared/ui/Button'

interface ApiErrorBoundaryProps {
  children: React.ReactNode
}

export default function ApiErrorBoundary({ children }: ApiErrorBoundaryProps) {
  const logError = (error: unknown, info: ErrorInfo) => {
    // 실제 에러 로그는 콘솔에서 확인
    console.group('🚨 조회 API 호출 에러 발생 🚨')
    console.error(error)
    console.error(info.componentStack)
    console.groupEnd()
  }

  return (
    <ErrorBoundary
      onError={logError}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col items-center gap-4 py-16">
          <Error message="일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." />
          <Button
            size="reg"
            onClick={resetErrorBoundary}
            className="hover:bg-brand-second text-brand-white rounded-md py-8 text-base font-black transition-all duration-200"
          >
            다시 시도
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
