import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatStore {
  enteredRoomId: number | null
  setEnteredRoomId: (roomId: number) => void
  clearEnteredRoomId: () => void
}

const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      enteredRoomId: null,
      setEnteredRoomId: (roomId) => set({ enteredRoomId: roomId }),
      clearEnteredRoomId: () => set({ enteredRoomId: null }),
    }),
    { name: 'chat-storage' }
  )
)

export { useChatStore }
