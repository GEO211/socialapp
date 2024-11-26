import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Heart, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const posts = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=400",
    likes: 1,
    username: "Hobbit",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=400",
    likes: 42,
    username: "JavaScript Mastery",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=400",
    likes: 128,
    username: "Alexander",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=400",
    likes: 56,
    username: "Faizan",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=400&width=400",
    likes: 89,
    username: "Ana Pablova",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=400&width=400",
    likes: 23,
    username: "David",
    avatar: "/placeholder.svg",
  },
]

export default function Explore() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Search Posts</h1>
          <Input 
            placeholder="Search" 
            className="mb-8 bg-neutral-900 border-neutral-800"
          />
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Popular Today</h2>
            <select className="bg-neutral-900 border-neutral-800 rounded-md px-2 py-1">
              <option>All</option>
              <option>Following</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.id} className="group relative aspect-square">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-6 h-6" />
                      <span>{post.likes}</span>
                    </div>
                    <Bookmark className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={post.avatar} alt={post.username} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.username}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

