import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

interface QuizInputFormProps {
  value: string
  isSubmitted: boolean
  isCorrect: boolean | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function QuizInputForm({
  value,
  isSubmitted,
  isCorrect,
  onChange,
  onSubmit,
}: QuizInputFormProps) {
  return (
    <form className="flex w-full gap-2" onSubmit={onSubmit}>
      <Input
        size="lg"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="빈칸에 들어갈 단어를 입력해주세요"
        className={cn(
          'bg-brand-light flex-1 rounded-xl px-6 py-2.5 text-center text-sm text-black transition-colors outline-none',
          {
            'ring-brand-error bg-red-50 ring-2': isSubmitted && !isCorrect,
          }
        )}
        disabled={isSubmitted && isCorrect}
      />
      <Button
        type="submit"
        className={cn(
          'rounded-xl border-2 border-white bg-transparent px-8 py-2.5 font-bold text-white transition-all',
          {
            'cursor-default': isSubmitted && isCorrect,
            'hover:text-brand-main hover:bg-white': !(isSubmitted && isCorrect),
          }
        )}
      >
        정답 제출
      </Button>
    </form>
  )
}

export default QuizInputForm
