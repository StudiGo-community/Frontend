'use client'

import React, { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input/Input'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  QuizAnswerForm,
  QuizAnswerFormSchema,
} from '@/entities/quiz/model/schema'

interface QuizInputFormProps {
  onSubmit: () => void
}

export function QuizInputForm({ onSubmit }: QuizInputFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<QuizAnswerForm>({
    resolver: zodResolver(QuizAnswerFormSchema),
    mode: 'onChange',
    defaultValues: {
      submittedAnswerText: '',
    },
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleConfirm = () => {
    onSubmit()
    setIsModalOpen(false)
  }

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex w-full items-center gap-4"
      >
        <Input
          {...register('submittedAnswerText')}
          placeholder="빈칸에 들어갈 단어를 입력해주세요"
          className="h-10 rounded-lg border-none bg-white pr-16 text-black placeholder:text-gray-400"
        />

        <Button
          type="submit"
          className="h-10 shrink-0 rounded-lg border-2 border-white bg-transparent px-6 font-bold text-white transition-all hover:bg-white/10 max-sm:px-2"
        >
          제출
        </Button>
      </form>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="정답 제출"
        confirmText="제출"
      >
        정답을 제출하시겠습니까?
      </ConfirmModal>
    </>
  )
}
