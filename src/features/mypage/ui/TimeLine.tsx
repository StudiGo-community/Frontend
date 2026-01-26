import React from 'react'

const AttendanceCircle = ({
  status,
  date,
}: {
  status: 'check' | 'alert' | 'go' | 'none'
  date: string
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
          status === 'check'
            ? 'border-[#4ADE80] bg-[#4ADE80] text-white'
            : status === 'alert'
              ? 'border-[#F87171] bg-[#F87171] text-xl font-bold text-white'
              : status === 'go'
                ? 'border-[#4ADE80] bg-white font-bold text-[#4ADE80]'
                : 'border-dashed border-gray-200 bg-transparent'
        }`}
      >
        {status === 'check' && (
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {status === 'alert' && '!'}
        {status === 'go' && <span className="text-sm">GO</span>}
      </div>
      <span className="text-[11px] font-medium whitespace-nowrap text-gray-500">
        {date}
      </span>
    </div>
  )
}

export default function TimeLine() {
  return (
    <div className="flex items-center justify-between border-y border-gray-100 px-4 py-8">
      <button className="text-4xl font-light text-gray-200">〈</button>
      <div className="flex max-w-2xl flex-1 justify-between px-8">
        <AttendanceCircle status="check" date="01.08. 목" />
        <AttendanceCircle status="check" date="01.09. 금" />
        <AttendanceCircle status="alert" date="01.10. 토" />
        <AttendanceCircle status="go" date="01.11. 일" />
        <AttendanceCircle status="none" date="01.12. 월" />
        <AttendanceCircle status="none" date="01.13. 화" />
        <AttendanceCircle status="none" date="01.14. 수" />
      </div>
      <button className="text-4xl font-light text-gray-200">〉</button>
    </div>
  )
}
