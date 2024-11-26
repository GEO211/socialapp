'use client'

import { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/AppContext"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useApp()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.user) {
      setUser(data.user)
      router.push('/')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#877EFF] rounded-full flex items-center justify-center">
              <span className="sr-only">Snapgram</span>
            </div>
            <h1 className="text-xl font-bold">Snapgram</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Log in to your account</h2>
            <p className="text-neutral-400">Welcome back! Please enter your details</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-neutral-900 border-neutral-800"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-neutral-900 border-neutral-800"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#877EFF] hover:bg-[#7165E3] text-white">
              Sign in
            </Button>
          </form>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#877EFF] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-neutral-900 p-6">
        <div className="grid grid-cols-3 gap-4 h-full">
          <img src="/placeholder.svg?height=300&width=300" alt="Image 1" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 2" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 3" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 4" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 5" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 6" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 7" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 8" className="w-full h-full object-cover rounded-lg" />
          <img src="/placeholder.svg?height=300&width=300" alt="Image 9" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>
    </div>
  )
}

