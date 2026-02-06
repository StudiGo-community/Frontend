'use client'

import { useState } from 'react'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'
import ActionDropdown from '@/shared/ui/ActionDropdown'
import { Share, Trash2 } from 'lucide-react'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { copyToClipboard } from '@/shared/lib/copyToClipboard'
// import { revalidatePath } from 'next/cache'
// import { deleteCommentAction } from '@/features/community-comment-manage/api/deleteCommentAction'
// import { useRouter } from 'next/navigation'

interface CommentActionMenuProps {
  postId: number
  commentId: number
  currentPage?: number
}

export default function CommentActionMenu({
  postId,
  commentId,
  currentPage,
}: CommentActionMenuProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleShare = () => {
    const pageParam =
      currentPage && currentPage > 1 ? `?page=${currentPage}` : ''
    const hash = `#comment-${commentId}`
    const url = `${window.location.origin}/community/${postId}${pageParam}${hash}`
    copyToClipboard(url)
  }

  const handleDelete = async () => {
    // TODO: 실제 삭제 API 연동
    console.log('삭제하기', postId, commentId)
    // revalidatePath(`/community/${postId}`)
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      <ActionDropdown>
        <DropdownMenu.Item
          className="text-brand-gray-500 flex cursor-pointer items-center justify-between py-2"
          onClick={handleShare}
        >
          <span>공유하기</span>
          <Share />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          variant="destructive"
          className="flex cursor-pointer items-center justify-between py-2"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <span>삭제하기</span>
          <Trash2 />
        </DropdownMenu.Item>
      </ActionDropdown>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="알림"
        confirmText="삭제"
      >
        댓글을 <strong className="text-brand-main">삭제</strong> 하시겠습니까?
      </ConfirmModal>
    </>
  )
}
