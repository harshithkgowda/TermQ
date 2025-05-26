// In your app/page.tsx
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </main>
    )
  }

  // Dynamically import here
  const TCAnalyzerInterface = dynamic(() => import('@/components/TCAnalyzerInterface'), { ssr: false })

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-sky-50 p-10">
      {/* Your existing JSX */}
      <TCAnalyzerInterface />
    </main>
  )
}