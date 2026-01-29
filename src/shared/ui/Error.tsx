import { cn } from '@/shared/lib/cn'

interface ErrorProps {
  message: string
  className?: string
}

function Error({ message, className }: ErrorProps) {
  return (
    <div className={cn('text-brand-gray-500 py-10 text-center', className)}>
      {message}
    </div>
  )
}

export default Error
