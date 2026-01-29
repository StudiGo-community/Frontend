import { cn } from '@/shared/lib/cn'

interface EmptyStateProps {
  message: string
  className?: string
}

function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn('text-brand-gray-500 text-center', className)}>
      {message}
    </div>
  )
}

export default EmptyState
