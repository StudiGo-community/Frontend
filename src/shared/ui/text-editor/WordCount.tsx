import { useTiptap, useTiptapState } from '@tiptap/react'
import { cn } from '@/shared/lib/cn'

// TODO: 상수로 옮기기
const MAX_WORD_COUNT = 2000

export default function WordCount() {
  const { isReady } = useTiptap()

  const wordCount = useTiptapState((state) => {
    return state.editor.state.doc.textContent.length
  })

  const percentage = Math.min((wordCount / MAX_WORD_COUNT) * 100, 100)

  if (!isReady) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-end gap-2 bg-white p-2',
        wordCount === MAX_WORD_COUNT && 'character-count--warning' // 팁탭 글자수 세기 익스텐션 찾아보기
      )}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="var(--color-brand-second)"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      <span className="text-brand-gray-400">
        {wordCount} / {MAX_WORD_COUNT} 글자
      </span>
    </div>
  )
}
