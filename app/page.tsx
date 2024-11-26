'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from "@/components/sidebar"
import { Post } from "@/components/post"
import { useApp } from "@/contexts/AppContext"

export default function Home() {
  const { user, posts } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user
, router])

  if (!user) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Home Feed</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          {posts.map((post) => (
            <Post key={post.id} post={post} author={user} />
          ))}
        </div>
      </main>
    </div>
  )
}

