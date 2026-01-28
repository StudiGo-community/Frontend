import MessageInput from '@/features/chat-message-send/ui/MessageInput'
import ChatHeader from '@/widgets/chat-header/ui/ChatHeader'
import MessageList from '@/widgets/chat-message-list/ui/MessageList'
import ChatSidebar from '@/widgets/chat-sidebar/ui/ChatSidebar'

async function ChatDetails({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  // TODO: API 연결할때 활용하기
  const { roomId } = await params
  console.log(roomId)

  return (
    <div className="mx-auto flex max-w-300 gap-8 pt-8">
      <ChatSidebar />
      <section className="mb-16 flex-1 px-3">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </section>
    </div>
  )
}

export default ChatDetails
