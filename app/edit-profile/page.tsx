import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil } from 'lucide-react'

export default function EditProfile() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <Pencil className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Button variant="link" className="text-[#877EFF]">
              Change profile photo
            </Button>
          </div>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Name</label>
              <Input defaultValue="JavaScript Mastery" className="bg-neutral-900 border-neutral-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Username</label>
              <Input defaultValue="@JSMastery" className="bg-neutral-900 border-neutral-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Email</label>
              <Input defaultValue="jsmastery@example.com" className="bg-neutral-900 border-neutral-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Bio</label>
              <Textarea className="bg-neutral-900 border-neutral-800 min-h-[100px]" />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" className="bg-neutral-900 border-neutral-800">
                Cancel
              </Button>
              <Button className="bg-[#877EFF] hover:bg-[#7165E3] text-white">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

