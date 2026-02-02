import ChatSidebar from '@/widgets/chat-sidebar/ui/ChatSidebar'
import ChatWindow from '@/widgets/chat-window/ui/ChatWindow'

async function ChatDetails({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  const { roomId } = await params
  const parsedRoomId = Number(roomId)

  return (
    <div className="mx-auto flex max-w-300 gap-8 pt-8">
      <ChatSidebar roomId={parsedRoomId} />
      <ChatWindow roomId={parsedRoomId} />
    </div>
  )
}

export default ChatDetails
