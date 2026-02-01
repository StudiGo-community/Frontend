import MessageInput from '@/features/chat-message-send/ui/MessageInput'
import ChatHeader from '@/widgets/chat-window/ui/ChatHeader'
import MessageList from '@/widgets/chat-window/ui/MessageList'

interface ChatWindowProps {
  roomId: number
}

function ChatWindow({ roomId }: ChatWindowProps) {
  return (
    <section className="mb-16 flex-1 px-3">
      <ChatHeader roomId={roomId} />
      <MessageList roomId={roomId} />
      <MessageInput roomId={roomId} />
    </section>
  )
}

export default ChatWindow
