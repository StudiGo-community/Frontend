import { Heart, MessageSquare, Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import PostStats from '@/entities/post/ui/PostStats'
import Image from 'next/image'
import ActionDropdown from '@/shared/ui/ActionDropdown'
import { cn } from '@/shared/lib/cn'
import { Post } from '@/entities/post/model/type'

interface CommunityPostProps {
  post: Post
}

export default async function CommunityPost({ post }: CommunityPostProps) {
  return (
    <>
      {/* 헤더 */}
      <section className="border-brand-gray-100 mt-4 space-y-4 border-b-2">
        {/* 제목, 드롭다운 */}
        <div className="flex items-center justify-between">
          <h1 className="text-brand-black text-4xl font-extrabold">
            {post.title}
          </h1>

          {/* TODO: 기능, 인자 어떻게 처리할지 결정하기 */}
          <ActionDropdown />
        </div>

        {/* 기타 정보 */}
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 작성자, 시간 */}
          <div className="text-brand-gray-400 flex items-center gap-4 text-base">
            {/* TODO: 아바타 컴포넌트 분리 */}
            {post.author.profileImageUrl ? (
              <Image
                src={post.author.profileImageUrl}
                alt={post.author.nickname}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="bg-brand-gray-200 h-6 w-6 shrink-0 rounded-full" />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-brand-black text-lg font-bold">
                {post.author.nickname}
              </span>
              <span className="text-brand-gray-300 text-sm">
                {post.createdAt}
              </span>
            </div>
          </div>

          {/* 횟수: (조회수, 좋아요, 댓글) */}
          <PostStats
            viewCount={post.viewCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            className="self-end"
          />
        </div>
      </section>

      {/* 본문 */}
      {/* TODO: 클라이언트 컴포넌트로 분리 (내용 부분은 팁탭 에디터 뷰어) */}
      <section>
        {/* 내용 */}
        <div className="py-8">{post.content}</div>

        {/* 버튼: (좋아요, 신고하기), 댓글 수 */}
        <div className="flex items-end justify-between py-4">
          {/* TODO: 컴포넌트 분리 (클라이언트 컴포넌트 + 기능 컴포넌트 필요) */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              // onClick={() => {}}
              className="text-sm"
            >
              <Heart
                size={14}
                strokeWidth={2}
                className={cn(
                  'text-brand-third',
                  post.isLiked && 'fill-brand-third'
                )}
              />
              <span>좋아요</span>
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Siren size={14} strokeWidth={2} className="text-brand-third" />
              <span>신고하기</span>
            </Button>
          </div>

          <span className="text-brand-gray-400 flex items-center gap-1">
            <MessageSquare size={14} strokeWidth={2} />
            {post.commentCount.toLocaleString()}
          </span>
        </div>
      </section>
    </>
  )
}
