import { create } from 'zustand'
import { chatSocketApi } from '@/entities/message/api/socket'

interface ChatSocketStore {
  socket: WebSocket | null
  isConnected: boolean
  connect: (roomId: number, accessToken: string) => WebSocket
  disconnect: () => void
}

const useChatSocketStore = create<ChatSocketStore>((set, get) => ({
  socket: null,
  isConnected: false,

  connect: (roomId: number, accessToken: string) => {
    const currentSocket = get().socket
    const isSameAccessToken = currentSocket?.url.includes(accessToken)
    if (
      currentSocket &&
      isSameAccessToken &&
      (currentSocket.readyState === WebSocket.OPEN ||
        currentSocket.readyState === WebSocket.CONNECTING)
    )
      return currentSocket
    if (currentSocket && !isSameAccessToken) currentSocket.close()

    const newSocket = chatSocketApi.connect(roomId, accessToken)
    // 소켓 연결 성공
    newSocket.onopen = () => set({ socket: newSocket, isConnected: true })
    // 소켓 연결 종료 & 비정상 종료 시 재연결 시도
    newSocket.onclose = (event) => {
      set({ socket: null, isConnected: false })

      if (!event.wasClean) {
        setTimeout(() => get().connect(roomId, accessToken), 3000)
      }
    }
    // 에러로 인한 연결 종료 → 이후 소켓 연결 종료 이벤트 발생
    newSocket.onerror = () => {
      set({ isConnected: false })
    }

    return newSocket
  },

  disconnect: () => {
    const currentSocket = get().socket
    if (!currentSocket) return
    if (
      currentSocket &&
      (currentSocket.readyState === WebSocket.CLOSING ||
        currentSocket.readyState === WebSocket.CLOSED)
    )
      return

    currentSocket.close()
    set({ socket: null, isConnected: false })
  },
}))

export { useChatSocketStore }
