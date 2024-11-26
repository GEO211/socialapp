import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Signup() {
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
            <h2 className="text-2xl font-bold">Create a new account</h2>
            <p className="text-neutral-400">To use Snapgram, please enter your details</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Name</label>
              <Input className="bg-neutral-900 border-neutral-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Username</label>
              <Input className="bg-neutral-900 border-neutral-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Email</label>
              <Input className="bg-neutral-900 border-neutral-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Password</label>
              <Input type="password" className="bg-neutral-900 border-neutral-800" />
            </div>
            <Button className="w-full bg-[#877EFF] hover:bg-[#7165E3] text-white">
              Sign up
            </Button>
          </form>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#877EFF] hover:underline">
              Log in
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

