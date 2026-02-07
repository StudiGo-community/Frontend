import Link from 'next/link'

export type TimelineItem = {
  date: string
  day: string
  status: 'done' | 'fail' | 'go' | 'upcoming'
}

const TimelineDot = ({
  status,
  goHref,
}: {
  status: TimelineItem['status']
  goHref?: string
}) => {
  if (status === 'done') {
    return (
      <div className="bg-brand-green text-brand-white shadow-brand-sm border-brand-green flex h-11 w-11 items-center justify-center rounded-full border-2">
        <span className="text-base font-black">✓</span>
      </div>
    )
  }

  if (status === 'fail') {
    return (
      <div className="bg-brand-gray-100 text-brand-main shadow-brand-sm border-brand-gray-100 flex h-11 w-11 items-center justify-center rounded-full border-2">
        <span className="text-base font-black">!</span>
      </div>
    )
  }

  if (status === 'go') {
    if (goHref) {
      return (
        <Link
          href={goHref}
          aria-label="오늘의 문제 풀러가기"
          className="border-brand-green bg-brand-white shadow-brand-sm grid h-14 w-14 place-items-center rounded-full border-4"
        >
          <span className="text-brand-green text-base font-black">GO</span>
        </Link>
      )
    }

    return (
      <div className="border-brand-green bg-brand-white shadow-brand-sm grid h-14 w-14 place-items-center rounded-full border-4">
        <span className="text-brand-green text-base font-black">GO</span>
      </div>
    )
  }

  return (
    <div className="border-brand-gray-200 bg-brand-white flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed" />
  )
}

const TimeLine = ({
  items,
  goHref = '/community',
}: {
  items: TimelineItem[]
  goHref?: string
}) => {
  return (
    <div className="relative min-h-14 w-full px-5">
      <div
        className="bg-brand-gray-200 absolute right-0 left-0 z-0 h-px"
        style={{ top: 'calc(50% - 10px)', transform: 'translateY(-50%)' }}
      />
      <div className="relative z-10 flex min-h-14 w-full items-center justify-between">
        {items.map((it) => (
          <div
            key={`${it.date}-${it.day}`}
            className="flex flex-col items-center"
          >
            <TimelineDot
              status={it.status}
              goHref={it.status === 'go' ? goHref : undefined}
            />
            <div className="mt-3 text-center">
              <p
                className={
                  it.status === 'go'
                    ? 'text-brand-black text-sm font-bold'
                    : 'text-brand-gray-400 text-xs'
                }
              >
                {it.date}. {it.day}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimeLine
