import { Skeleton } from '@/shared/ui/Skeleton'

export function CommunityBannerSkeleton() {
  return (
    <section className="flex h-50 w-full gap-4">
      {/* Quote Area (Active by default) */}
      <Skeleton className="h-full flex-[1.8] rounded-2xl" />
      {/* Quiz Area */}
      <Skeleton className="h-full flex-1 rounded-2xl" />
    </section>
  )
}
