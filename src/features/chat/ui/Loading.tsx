import { cn } from '@/shared/lib/cn'

interface LoadingProps {
  className?: string
}

function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('animate-pulse py-10 text-center', className)}>
      Loading...
    </div>
  )
}

export default Loading
