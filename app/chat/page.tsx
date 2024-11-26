'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from "@/components/sidebar"
import { ChatMessage } from "@/components/chat-message"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/AppContext"
import { db } from '@/lib/firebase'
import { collection, query, orderBy, limit, addDoc, onSnapshot, Timestamp } from 'firebase/firestore'

interface Message {
  id: string
  content: string
  sender: string
  timestamp: Timestamp
}

export default function Chat() {
  const { user, loading } = useApp()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(50))
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Message))
        setMessages(fetchedMessages.reverse())
      })

      return () => unsubscribe()
    }
  }, [user])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newMessage.trim()) return

    await addDoc(collection(db, 'messages'), {
      content: newMessage,
      sender: user.uid,
      timestamp: Timestamp.now()
    })

    setNewMessage('')
  }

  if (loading || !user) return null

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Chat</h1>
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              sender={message.sender}
              timestamp={message.timestamp.toDate()}
              isSentByUser={message.sender === user.uid}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-neutral-900 border-neutral-800"
          />
          <Button type="submit" className="bg-[#877EFF] hover:bg-[#7165E3] text-white">
            Send
          </Button>
        </form>
      </main>
    </div>
  )
}

