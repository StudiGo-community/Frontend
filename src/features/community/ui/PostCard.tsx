'use client'

// import React from 'react'
import { Eye, Heart, MessageSquare } from 'lucide-react'
// import { cn } from '@/shared/lib/cn'

interface PropCardProps {
  post: {
    author: {
      nickname: string
      profileImage?: string
    }
    title: string
    createdAt: string
    views: number
    likes: number
    comments: number
    thumbnail?: string
  }
}

export default function PostCard({ post }: PropCardProps) {
  return (
    <article className="group hover:bg-brand-gray-50 flex cursor-pointer items-center justify-between px-2 py-6 transition-all">
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="text-brand-gray-400 flex items-center gap-2 text-sm">
          <div className="bg-brand-gray-200 h-6 w-6 shrink-0 overflow-hidden rounded-full">
            {post.author.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author.nickname}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-brand-gray-300 h-full w-full" />
            )}
          </div>
          <span className="text-brand-black font-bold">
            {post.author.nickname}
          </span>
          <span className="text-brand-gray-300">{post.createdAt}</span>
        </div>

        <h3 className="text-brand-black group-hover:text-brand-main line-clamp-1 text-xl leading-snug font-bold transition-colors">
          {post.title}
        </h3>

        <div className="text-brand-gray-400 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Eye size={14} strokeWidth={2} /> 조회수
            {post.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={14} strokeWidth={2} />
            좋아요 {post.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} strokeWidth={2} /> 댓글
            {post.comments.toLocaleString()}
          </span>
        </div>
      </div>

      {post.thumbnail && (
        <div className="bg-brand-gray-100 border-brand-gray-50 ml-6 h-24 w-24 shrink-0 overflow-hidden rounded-xl border">
          <img
            src={post.thumbnail}
            alt="post thumbnail"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </article>
  )
}
