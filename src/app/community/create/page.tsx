import PostForm from '@/features/community/post/components/PostForm'

export default function PostCreate() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-300 px-6 py-8">
        <header className="mb-0 flex items-center justify-between border-b pb-6">
          <h1 className="text-brand-black text-3xl font-black">게시글 작성</h1>
        </header>

        <PostForm />
      </div>
    </div>
  )
}
