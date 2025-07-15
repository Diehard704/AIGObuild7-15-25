import { Duration } from '@/lib/duration'
import { fragmentSchema as schema } from '@/lib/schema'
import { toPrompt } from '@/lib/prompt'
import ratelimit from '@/lib/ratelimit'
import { streamObject, CoreMessage } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'

export const maxDuration = 60

const rateLimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 10
const ratelimitWindow = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : '1d'

export async function POST(req: Request) {
  const {
    messages,
    userID,
    teamID,
    template,
  }: {
    messages: CoreMessage[]
    userID: string | undefined
    teamID: string | undefined
    template: string
  } = await req.json()

  const limit = await ratelimit(
    req.headers.get('x-forwarded-for'),
    rateLimitMaxRequests,
    ratelimitWindow,
  )

  if (limit) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.amount.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
        'X-RateLimit-Reset': limit.reset.toString(),
      },
    })
  }

  console.log('userID', userID)
  console.log('teamID', teamID)
  console.log('Using Claude 4 (Sonnet 4) for AI generation')

  // Create Claude 4 (Sonnet 4) client with enhanced generation capabilities
  const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })
  
  const claudeModel = anthropic('claude-sonnet-4-20250514')

  try {
    const stream = await streamObject({
      model: claudeModel,
      schema,
      system: toPrompt(template),
      messages,
      maxRetries: 0,
      temperature: 0.7,
      maxTokens: 4000
    })

    return stream.toTextStreamResponse()
  } catch (error: any) {
    const isRateLimitError =
      error && (error.statusCode === 429 || error.message.includes('limit'))
    const isOverloadedError =
      error && (error.statusCode === 529 || error.statusCode === 503)
    const isAccessDeniedError =
      error && (error.statusCode === 403 || error.statusCode === 401)

    if (isRateLimitError) {
      return new Response(
        'Claude is currently unavailable due to request limit. Please try again later.',
        {
          status: 429,
        },
      )
    }

    if (isOverloadedError) {
      return new Response(
        'Claude is currently unavailable. Please try again later.',
        {
          status: 529,
        },
      )
    }

    if (isAccessDeniedError) {
      return new Response(
        'Access denied. Please check Claude API key configuration.',
        {
          status: 403,
        },
      )
    }

    console.error('Claude API Error:', error)

    return new Response(
      'An unexpected error has occurred with Claude. Please try again later.',
      {
        status: 500,
      },
    )
  }
}
