'use client'

import { Bone, Bot } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Bone className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
        <Bot className="w-4 h-4 absolute -top-1 -right-1" style={{ color: 'var(--primary-coral)' }} />
      </div>
      <span className="text-xl font-bold" style={{ color: 'var(--primary-blue)' }}>FitAI</span>
    </div>
  )
}