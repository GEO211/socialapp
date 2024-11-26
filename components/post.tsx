'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useApp } from "@/contexts/AppContext"
import { db } from '@/lib/firebase'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc, Timestamp } from 'firebase/firestore'

interface PostProps {
  id: string
  userId: string
  image: string
  caption: string
  timestamp: Timestamp
  likes: string[]
  comments: { id: string; userId: string; content: string; timestamp: Timestamp }[]
}

export function Post({ id, userId, image, caption, timestamp, likes, comments }: PostProps) {
  const { user } = useApp()
  const [comment, setComment] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const checkIfSaved = async () => {
      if (user) {
        const savedPostsRef = doc(db, 'users', user.uid, 'savedPosts', id)
        const savedPostDoc = await getDoc(savedPostsRef)
        setIsSaved(savedPostDoc.exists())
      }
    }
    checkIfSaved()
  }, [user, id])

  const handleLike = async () => {
    if (!user) return
    const postRef = doc(db, 'posts', id)
    if (likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid)
      })
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid)
      })
    }
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !comment.trim()) return
    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, {
      comments: arrayUnion({
        id: Date.now().toString(),
        userId: user.uid,
        content: comment,
        timestamp: Timestamp.now()
      })
    })
    setComment('')
  }

  const handleSave = async () => {
    if (!user) return
    const savedPostsRef = doc(db, 'users', user.uid, 'savedPosts', id)
    if (isSaved) {
      await setDoc(savedPostsRef, { savedAt: Timestamp.now() })
    } else {
      await setDoc(savedPostsRef, { savedAt: Timestamp.now() })
    }
    setIsSaved(!isSaved)
  }

  return (
    <Card className="bg-black border-neutral-800">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={'/placeholder.svg'} alt={userId} />
          <AvatarFallback>{userId[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{userId}</span>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{timestamp.toDate().toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <img src={image} alt="Post" className="w-full aspect-square object-cover" />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:text-[#877EFF]" onClick={handleLike}>
              <Heart className={`w-6 h-6 ${likes.includes(user?.uid || '') ? 'fill-[#877EFF] text-[#877EFF]' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-[#877EFF] text-[#877EFF]' : ''}`} />
          </Button>
        </div>
        <div className="text-sm font-medium">{likes.length} likes</div>
        <p className="text-sm">
          <span className="font-medium mr-2">{userId}</span>
          {caption}
        </p>
        {comments.map((comment) => (
          <p key={comment.id} className="text-sm">
            <span className="font-medium mr-2">{comment.userId}</span>
            {comment.content}
          </p>
        ))}
        <form onSubmit={handleComment} className="w-full">
          <Input
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-neutral-900 border-neutral-800"
          />
        </form>
      </CardFooter>
    </Card>
  )
}

