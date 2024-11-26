'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useApp } from "@/contexts/AppContext"

export default function CreatePost() {
  const [image, setImage] = useState('')
  const [caption, setCaption] = useState('')
  const { user, refetchPosts } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const newPost = {
      id: Date.now().toString(),
      userId: user.id,
      image,
      caption,
      timestamp: new Date().toISOString(),
      likes: [],
      comments: [],
    }

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })

    refetchPosts()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Create Post</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bg-neutral-900 border-neutral-800"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Caption</label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="bg-neutral-900 border-neutral-800 min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#877EFF] hover:bg-[#7165E3] text-white">
            Create Post
          </Button>
        </form>
      </main>
    </div>
  )
}

