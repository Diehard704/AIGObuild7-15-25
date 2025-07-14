import { Message } from '@/lib/messages'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { LoaderIcon, Terminal } from 'lucide-react'
import { useEffect } from 'react'

export function Chat({
  messages,
  isLoading,
  setCurrentPreview,
}: {
  messages: Message[]
  isLoading: boolean
  setCurrentPreview: (preview: {
    fragment: DeepPartial<FragmentSchema> | undefined
    result: ExecutionResult | undefined
  }) => void
}) {
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [JSON.stringify(messages)])

  return (
    <div
      id="chat-container"
      className="flex flex-col pb-12 gap-4 overflow-y-auto max-h-full"
    >
      {messages.map((message: Message, index: number) => (
        <div
          className={`flex flex-col px-4 shadow-sm whitespace-pre-wrap ${message.role !== 'user'
              ? 'bg-surface-container border border-outline text-foreground py-4 rounded-2xl gap-4 w-full'
              : 'bg-primary/10 border border-primary/20 py-3 rounded-xl gap-2 w-fit ml-auto'
            } m3-body-medium`}
          key={index}
        >
          {message.content.map((content, id) => {
            if (content.type === 'text') {
              return (
                <div key={id} className="leading-relaxed">
                  {content.text}
                </div>
              )
            }
            if (content.type === 'image') {
              return (
                <img
                  key={id}
                  src={content.image}
                  alt="fragment"
                  className="mr-2 inline-block w-12 h-12 object-cover rounded-lg bg-surface-container border border-outline mb-2"
                />
              )
            }
          })}
          {message.object && (
            <div
              onClick={() =>
                setCurrentPreview({
                  fragment: message.object,
                  result: message.result,
                })
              }
              className="py-3 pl-3 w-full md:w-max flex items-center border border-outline rounded-xl select-none hover:bg-surface-container/50 hover:cursor-pointer transition-colors duration-200 m3-ripple"
            >
              <div className="rounded-lg w-10 h-10 bg-primary/20 self-stretch flex items-center justify-center">
                <Terminal strokeWidth={2} className="text-primary" />
              </div>
              <div className="pl-3 pr-4 flex flex-col">
                <span className="m3-title-medium font-semibold text-foreground">
                  {message.object.title}
                </span>
                <span className="m3-body-small text-muted-foreground">
                  Click to see fragment
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center gap-3 px-4 py-3 bg-surface-container border border-outline rounded-xl w-fit">
          <LoaderIcon className="h-4 w-4 animate-spin text-primary" />
          <span className="m3-body-medium text-muted-foreground">
            Generating your app...
          </span>
        </div>
      )}
    </div>
  )
}
