import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Snapgram",
  description: "A social media platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

