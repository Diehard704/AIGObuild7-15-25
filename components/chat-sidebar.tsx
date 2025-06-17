'use client'

import { useState } from 'react'
import { Chat } from './chat'
import { ChatInput } from './chat-input'

export function ChatSidebar({ messages, onSendMessage }) {
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
    <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Build Assistant</h2>
        <p className="text-sm text-gray-500">Ask me to modify your app</p>
      </div>
      
      {/* Chat Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <Chat 
          messages={messages} 
          isLoading={false}
          setCurrentPreview={() => {}}
        />
      </div>
      
      {/* Chat Input - Fixed at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to modify the app..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
