import Image from 'next/image'
import { Eye, Heart, MessageSquare } from 'lucide-react'
import { Post } from '@/features/community/mockData'
import Link from 'next/link'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="group hover:bg-brand-gray-50 hover:bg-brand-gray-100/35 flex cursor-pointer items-center justify-between rounded-lg px-2 py-4 transition-all"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* 상단 */}
        <div className="text-brand-gray-400 flex items-center gap-2 text-base">
          {post.author.profileImage ? (
            <Image
              src={post.author.profileImage}
              alt={post.author.nickname}
              width={24}
              height={24}
              className="shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="bg-brand-gray-200 h-6 w-6 shrink-0 rounded-full" />
          )}
          <span className="text-brand-black font-bold">
            {post.author.nickname}
          </span>
          <span className="text-brand-gray-300 pl-4">{post.createdAt}</span>
        </div>

        {/* 제목 */}
        <h3 className="text-brand-black group-hover:text-brand-main line-clamp-1 text-xl leading-snug font-bold transition-colors">
          {post.title}
        </h3>

        {/* 하단 */}
        <div className="text-brand-gray-400 flex items-center gap-4 text-base">
          <span className="flex items-center gap-1">
            <Eye size={14} strokeWidth={2} />
            {post.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={14} strokeWidth={2} />
            {post.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} strokeWidth={2} />
            {post.comments.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 썸네일 */}
      {post.thumbnail && (
        <div className="bg-brand-gray-100 border-brand-gray-50 relative ml-6 h-24 w-24 shrink-0 overflow-hidden rounded-xl border">
          <Image
            src={post.thumbnail}
            alt="post thumbnail"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </Link>
  )
}
