import OldPostForm from '@/features/community/post/components/OldPostForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  console.log(id)

  // TODO: 게시글 조회해서 폼에 기본값으로 넣기

  return (
    <>
      <h1 className="text-brand-black border-brand-gray-200 mt-4 border-b pb-6 text-4xl font-extrabold">
        게시글 수정
      </h1>

      <OldPostForm />
    </>
  )
}
