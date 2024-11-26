import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  content: string
  sender: string
  timestamp: Date
  isSentByUser: boolean
}

export function ChatMessage({ content, sender, timestamp, isSentByUser }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-2 mb-4 ${isSentByUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={'/placeholder.svg'} alt={sender} />
        <AvatarFallback>{sender[0]}</AvatarFallback>
      </Avatar>
      <div className={`flex flex-col ${isSentByUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-3 py-2 rounded-lg ${isSentByUser ? 'bg-[#877EFF] text-white' : 'bg-neutral-800'}`}>
          {content}
        </div>
        <span className="text-xs text-neutral-400 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

