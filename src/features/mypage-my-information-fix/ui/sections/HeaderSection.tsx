'use client'

interface HeaderSectionProps {
  title: string
}

export function HeaderSection({ title }: HeaderSectionProps) {
  return (
    <>
      <h1 className="text-brand-black text-3xl font-bold">{title}</h1>
      <div className="bg-brand-gray-200 mt-6 h-px w-full" />
    </>
  )
}
