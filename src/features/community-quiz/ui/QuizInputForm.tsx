'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input/Input'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  QuizAnswerForm,
  QuizAnswerFormSchema,
} from '@/entities/quiz/model/schema'
import { useAnswerQuizMutation } from '@/features/community-quiz/model/useAnswerQuizMutation'

export function QuizInputForm() {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate, isPending } = useAnswerQuizMutation()

  const form = useForm<QuizAnswerForm>({
    resolver: zodResolver(QuizAnswerFormSchema),
    mode: 'onChange',
    defaultValues: {
      submittedAnswerText: '',
    },
  })

  const onSubmit = (data: QuizAnswerForm) => {
    mutate(data, {
      onSettled: () => {
        setIsOpen(false)
      },
    })
  }

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center gap-4"
      >
        <Input
          {...form.register('submittedAnswerText')}
          placeholder="빈칸에 들어갈 단어를 입력해주세요"
          className="h-10 rounded-lg border-none bg-white pr-16 text-black placeholder:text-gray-400"
        />

        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="h-10 shrink-0 rounded-lg border-2 border-white bg-transparent px-6 font-bold text-white transition-all hover:bg-white/10 max-sm:px-2"
        >
          제출
        </Button>
      </form>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={form.handleSubmit(() => onSubmit(form.getValues()))}
        title="정답 제출"
        confirmText="제출"
        isPending={isPending}
      >
        정답을 제출하시겠습니까?
      </ConfirmModal>
    </>
  )
}
