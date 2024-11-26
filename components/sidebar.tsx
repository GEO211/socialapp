'use client'

import Link from "next/link"
import { Home, Compass, Users, Bookmark, PlusSquare, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useApp } from "@/contexts/AppContext"
import { useRouter } from "next/navigation"

export function Sidebar({ className }: { className?: string }) {
  const { user, setUser } = useApp()
  const router = useRouter()

  const handleLogout = () => {
    setUser(null)
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className={cn("w-64 bg-black border-r border-neutral-800 p-4 flex flex-col h-screen", className)}>
      <Link href="/" className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-[#877EFF] rounded-full flex items-center justify-center">
          <span className="sr-only">Snapgram</span>
        </div>
        <h1 className="text-xl font-bold">Snapgram</h1>
      </Link>

      <div className="flex items-center gap-2 px-2 mb-8">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-neutral-400">{user.username}</span>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
        <Button variant="ghost" asChild className="w-full justify-start hover:bg-neutral-900 hover:text-white">
          <Link href="/">
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
        </Button>
        <Button variant="ghost" asChild className="w-full justify-start hover:bg-neutral-900 hover:text-white">
          <Link href="/explore">
            <Compass className="w-5 h-5 mr-3" />
            Explore
          </Link>
        </Button>
        <Button variant="ghost" asChild className="w-full justify-start hover:bg-neutral-900 hover:text-white">
          <Link href="/people">
            <Users className="w-5 h-5 mr-3" />
            People
          </Link>
        </Button>
        <Button variant="ghost" asChild className="w-full justify-start hover:bg-neutral-900 hover:text-white">
          <Link href="/saved">
            <Bookmark className="w-5 h-5 mr-3" />
            Saved
          </Link>
        </Button>
        <Button variant="ghost" asChild className="w-full justify-start hover:bg-neutral-900 hover:text-white">
          <Link href="/create">
            <PlusSquare className="w-5 h-5 mr-3" />
            Create Post
          </Link>
        </Button>
      </nav>

      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start hover:bg-neutral-900 hover:text-white">
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </Button>
    </div>
  )
}

