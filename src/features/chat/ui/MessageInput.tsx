import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'

function MessageInput() {
  return (
    // TODO: 메세지 전송 API 연결할 때 이벤트 핸들러 추가
    <form className="border-t-brand-gray-200 mt-16 flex flex-col gap-4 border-t">
      <Input
        className="border-none px-8 py-4"
        placeholder="메세지를 입력해주세요."
      />
      <Button
        type="submit"
        size="sm"
        className="text-md self-end px-8 font-light"
      >
        전송
      </Button>
    </form>
  )
}

export default MessageInput
