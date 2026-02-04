import { cn } from '@/shared/lib/cn'

interface MessageViewLayoutProps {
  children: React.ReactNode
  className?: string
}

function MessageViewLayout({ children, className }: MessageViewLayoutProps) {
  return (
    <div className={cn('relative h-[calc(100vh-22rem)]', className)}>
      {children}
    </div>
  )
}

export default MessageViewLayout
