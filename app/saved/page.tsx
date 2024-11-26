'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from "@/components/sidebar"
import { Post } from "@/components/post"
import { useApp } from "@/contexts/AppContext"
import { db } from '@/lib/firebase'
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore'

export default function SavedPosts() {
  const { user, loading } = useApp()
  const router = useRouter()
  const [savedPosts, setSavedPosts] = useState<any[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (user) {
        const savedPostsRef = collection(db, 'users', user.uid, 'savedPosts')
        const savedPostsSnapshot = await getDocs(savedPostsRef)
        const savedPostsPromises = savedPostsSnapshot.docs.map(async (doc) => {
          const postRef = doc(db, 'posts', doc.id)
          const postSnap = await getDoc(postRef)
          return { id: postSnap.id, ...postSnap.data() }
        })
        const savedPostsData = await Promise.all(savedPostsPromises)
        setSavedPosts(savedPostsData)
      }
    }

    fetchSavedPosts()
  }, [user])

  if (loading || !user) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Saved Posts</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          {savedPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  )
}

