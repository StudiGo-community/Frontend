import PostForm from '@/widgets/community-form/ui/PostForm'

export default async function Page() {
  return (
    <>
      <h1 className="text-brand-black border-brand-gray-200 mt-4 border-b pb-6 text-4xl font-extrabold">
        게시글 작성
      </h1>

      <PostForm />
    </>
  )
}
