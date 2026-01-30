import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { chatSocketApi } from '@/features/chat-message-subscribe/api/socket'

interface ChatSocketContextValues {
  socketRef: RefObject<WebSocket | null>
  connect: (roomId: number, accessToken: string) => WebSocket
  disconnect: () => void
}

const ChatSocketContext = createContext<ChatSocketContextValues | null>(null)

function ChatSocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<WebSocket>(null)

  const connect = useCallback((roomId: number, accessToken: string) => {
    const socket = socketRef.current
    if (
      socket &&
      (socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING)
    )
      return socket

    const newSocket = chatSocketApi.connect(roomId, accessToken)
    const clearRef = () => {
      if (newSocket === socketRef.current) socketRef.current = null
    }
    newSocket.onclose = clearRef
    newSocket.onerror = clearRef

    socketRef.current = newSocket
    return newSocket
  }, [])

  const disconnect = useCallback(() => {
    const socket = socketRef.current
    if (!socket) return
    if (
      socket &&
      (socket.readyState === WebSocket.CLOSING ||
        socket.readyState === WebSocket.CLOSED)
    )
      return

    socket.close()
    socketRef.current = null
  }, [])

  useEffect(() => {
    return () => disconnect()
  }, [disconnect])

  return (
    <ChatSocketContext value={{ socketRef, connect, disconnect }}>
      {children}
    </ChatSocketContext>
  )
}

const useChatSocketContext = () => {
  const context = useContext(ChatSocketContext)
  if (!context)
    throw new Error(
      'ChatSocketContext must be used within a ChatSocketProvider'
    )
  return context
}

export { ChatSocketProvider, useChatSocketContext }
