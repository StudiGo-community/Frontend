'use client'

import { useState } from 'react'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'
import ActionDropdown from '@/shared/ui/ActionDropdown'
import { Pencil, Share, Trash2 } from 'lucide-react'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { useRouter } from 'next/navigation'
import { copyToClipboard } from '@/shared/lib/copyToClipboard'
import { useDeletePostMutation } from '@/features/community-post-manage/model/useDeletePostMutation'

interface PostActionMenuProps {
  postId: number
}

export default function PostActionMenu({ postId }: PostActionMenuProps) {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { mutate, isPending } = useDeletePostMutation()

  const handleShare = () => {
    const url = `${window.location.origin}/community/${postId}`
    copyToClipboard(url)
  }

  const handleDelete = async () => {
    mutate(postId, {
      onSettled: () => {
        setIsDeleteModalOpen(false)
      },
    })
  }

  const handleEdit = () => {
    setIsEditModalOpen(false)
    router.push(`/community/${postId}/edit`)
  }

  return (
    <>
      <ActionDropdown>
        <DropdownMenu.Item
          className="text-brand-gray-500 flex cursor-pointer items-center justify-between py-2"
          onClick={() => setIsEditModalOpen(true)}
        >
          <span>수정하기</span>
          <Pencil />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
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
        isPending={isPending}
      >
        게시글을 <span className="text-brand-main">삭제</span> 하시겠습니까?
      </ConfirmModal>

      {/* 수정 확인 모달 */}
      <ConfirmModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEdit}
        title="알림"
        confirmText="확인"
      >
        게시글을 <span className="text-brand-second">수정</span> 하시겠습니까?
      </ConfirmModal>
    </>
  )
}
