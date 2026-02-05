import Image from 'next/image'
import ActionDropdown from '@/shared/ui/ActionDropdown'
import { Comment } from '@/entities/post/model/comment.schema'

interface CommunityCommentProps {
  comment: Comment
}

export default async function CommunityComment({
  comment,
}: CommunityCommentProps) {
  return (
    <li className="flex justify-between py-2">
      {/* 좌측 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {comment.author.profileImageUrl ? (
            <Image
              src={comment.author.profileImageUrl}
              alt={comment.author.nickname}
              width={24}
              height={24}
              className="size-6 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="bg-brand-gray-200 h-6 w-6 shrink-0 rounded-full" />
          )}
          <span className="text-brand-gray-500 text-base font-bold">
            {comment.author.nickname}
          </span>
        </div>
        <div>{comment.content}</div>
        <span className="text-brand-gray-300 text-sm">
          {comment.createdAt.toLocaleString()}
        </span>
      </div>

      {/* 우측 */}
      <div className="flex flex-col items-end justify-between">
        {/* TODO: 기능, 인자 어떻게 처리할지 결정하기 */}
        <ActionDropdown />

        {/* UI에만 존재하고 '댓글 좋아요' API가 없어서 컴포넌트 분리 진행하지 않았음. */}
        {/* <LikeButton isLiked={comment.isLiked} /> */}
      </div>
    </li>
  )
}
