import Image from 'next/image'
import Link from 'next/link'
import PostStats from '@/entities/post/ui/PostStats'
import { PostListItem } from '@/entities/post/model/post.schema'
import { formatCommunityDate } from '@/shared/lib/date'

interface PostCardProps {
  post: PostListItem
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <li>
      <Link
        href={`/community/${post.id}`}
        className="group hover:bg-brand-gray-50 hover:bg-brand-gray-100/35 flex items-center justify-between rounded-lg px-3 py-6 transition-all"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* 상단 */}
          <div className="text-brand-gray-400 flex items-center gap-2 text-base">
            {post.author.profileImageUrl ? (
              <Image
                src={post.author.profileImageUrl}
                alt={post.author.nickname}
                width={24}
                height={24}
                className="size-6 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="bg-brand-gray-200 h-6 w-6 shrink-0 rounded-full" />
            )}
            <span className="text-brand-black font-bold">
              {post.author.nickname}
            </span>
            <span className="text-brand-gray-300 pl-4 text-sm max-sm:hidden">
              {formatCommunityDate(post.updatedAt)}
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-brand-black group-hover:text-brand-main line-clamp-1 py-3 text-xl leading-snug font-bold transition-colors">
            {post.title}
          </h3>

          {/* 프리뷰 */}
          <p className="text-brand-gray-400 line-clamp-2 text-base max-sm:hidden">
            {post.contentPreview}
          </p>

          {/* 하단 */}
          <PostStats
            viewCount={post.viewCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        </div>

        {/* 썸네일 */}
        {post.thumbnailUrl && (
          <div className="bg-brand-gray-100 border-brand-gray-50 relative ml-6 h-32 w-32 shrink-0 overflow-hidden rounded-xl border">
            <Image
              src={post.thumbnailUrl}
              alt="post thumbnail"
              fill
              sizes="120px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </li>
  )
}
