import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const creators = [
  { name: "Alexander", username: "@persona2", email: "alexander@example.com", avatar: "/placeholder.svg", initial: "A" },
  { name: "Faizan", username: "@faizan", email: "faizan@example.com", avatar: "/placeholder.svg", initial: "F" },
  { name: "JavaScript Mastery", username: "@JSMastery", email: "jsmastery@example.com", avatar: "/placeholder.svg", initial: "JS" },
  { name: "Ana Pablova", username: "@anapavlova", email: "ana@example.com", avatar: "/placeholder.svg", initial: "A" },
  { name: "David", username: "@Lee", email: "david@example.com", avatar: "/placeholder.svg", initial: "D" },
  { name: "Hobbit", username: "@something", email: "hobbit@example.com", avatar: "/placeholder.svg", initial: "H" }
]

export function TopCreators() {
  return (
    <div className="w-64 p-4 border-l border-neutral-800">
      <h2 className="text-xl font-bold mb-4">Top Creators</h2>
      <div className="space-y-4">
        {creators.map((creator) => (
          <div key={creator.username} className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.initial}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">{creator.name}</span>
              <span className="text-xs text-neutral-400 truncate">{creator.username}</span>
            </div>
            <Button size="sm" className="bg-[#877EFF] hover:bg-[#7165E3] text-white">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

