import MessageInput from '@/features/chat-message-send/ui/MessageInput'
import ChatHeader from '@/widgets/chat-window/ui/ChatHeader'
import MessageList from '@/widgets/chat-window/ui/MessageList'

interface ChatWindowProps {
  enteredRoomId: number
}

function ChatWindow({ enteredRoomId }: ChatWindowProps) {
  return (
    <section className="mb-16 flex-1 px-3">
      <ChatHeader enteredRoomId={enteredRoomId} />
      <MessageList enteredRoomId={enteredRoomId} />
      <MessageInput enteredRoomId={enteredRoomId} />
    </section>
  )
}

export default ChatWindow
