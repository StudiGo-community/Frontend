import { cn } from '@/shared/lib/cn'
import { Eye, Heart, MessageSquare } from 'lucide-react'

interface PostStatsProps {
  viewCount: number
  likeCount: number
  commentCount: number
  className?: string
}

export default function PostStats({
  viewCount,
  likeCount,
  commentCount,
  className,
}: PostStatsProps) {
  return (
    <div
      className={cn(
        'text-brand-gray-400 flex items-center gap-4 text-base',
        className
      )}
    >
      <span className="flex items-center gap-1">
        <Eye size={14} strokeWidth={2} />
        {viewCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1">
        <Heart size={14} strokeWidth={2} />
        {likeCount.toLocaleString()}
      </span>
      <span className="flex items-center gap-1">
        <MessageSquare size={14} strokeWidth={2} />
        {commentCount.toLocaleString()}
      </span>
    </div>
  )
}
