'use client'
import { useEffect } from 'react'

export default function Toast({ message, onClose }: { message: string, onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000) // Hilang otomatis setelah 3 detik
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-10 right-10 z-[200] animate-pop-in">
      <div className="bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-zinc-800">
        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-[10px]">
          ✓
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}