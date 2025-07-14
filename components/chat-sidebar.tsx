'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { M3Button } from '@/components/ui/m3-button'
import { M3Card, M3CardContent } from '@/components/ui/m3-card'
import { Chat } from './chat'
import { ChatInput } from './chat-input'
import { Message } from '@/lib/messages'
import { Send, Sparkles, Bot } from 'lucide-react'

export function ChatSidebar({
  messages,
  onSendMessage
}: {
  messages: Message[]
  onSendMessage: (message: Message) => void
}) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage({
        role: 'user',
        content: [{ type: 'text', text: input }]
      })
      setInput('')
    }
  }

  return (
    <div className="w-[30%] bg-surface-container border-r border-outline flex flex-col">
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-outline bg-surface-container"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="m3-title-large font-semibold text-foreground">Build Assistant</h2>
            <p className="m3-body-small text-muted-foreground">Ask me to modify your app</p>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <Chat
          messages={messages}
          isLoading={false}
          setCurrentPreview={() => { }}
        />
      </div>

      {/* Chat Input - Fixed at Bottom */}
      <div className="p-4 border-t border-outline bg-surface-container">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me to modify the app..."
              className="w-full px-4 py-3 border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 m3-body-medium bg-surface-container placeholder:text-muted-foreground"
            />
            <M3Button
              type="submit"
              variant="filled"
              size="sm"
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </M3Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>Powered by AI</span>
          </div>
        </form>
      </div>
    </div>
  )
}
