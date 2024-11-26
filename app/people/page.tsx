'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from "@/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/AppContext"
import { db } from '@/lib/firebase'
import { collection, query, getDocs, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore'

interface User {
  id: string
  name: string
  username: string
  avatar: string
}

export default function People() {
  const { user, loading } = useApp()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [following, setFollowing] = useState<string[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, 'users'))
      const querySnapshot = await getDocs(q)
      const fetchedUsers = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as User))
      setUsers(fetchedUsers.filter(u => u.id !== user?.uid))
    }

    fetchUsers()
  }, [user])

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setFollowing(doc.data()?.following || [])
      })

      return () => unsubscribe()
    }
  }, [user])

  const handleFollow = async (userId: string) => {
    if (!user) return
    const userRef = doc(db, 'users', user.uid)
    if (following.includes(userId)) {
      await updateDoc(userRef, {
        following: arrayRemove(userId)
      })
    } else {
      await updateDoc(userRef, {
        following: arrayUnion(userId)
      })
    }
  }

  
if (loading || !user) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">People</h1>
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={u.avatar} alt={u.name} />
                  <AvatarFallback>{u.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{u.name}</h2>
                  <p className="text-sm text-neutral-400">@{u.username}</p>
                </div>
              </div>
              <Button
                onClick={() => handleFollow(u.id)}
                variant={following.includes(u.id) ? "secondary" : "default"}
                className={following.includes(u.id) ? "bg-neutral-800" : "bg-[#877EFF] hover:bg-[#7165E3]"}
              >
                {following.includes(u.id) ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

