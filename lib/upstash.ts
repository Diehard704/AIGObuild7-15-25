import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Initialize Redis client with URL-based connection
const redis = Redis.fromEnv() || new Redis({
  url: process.env.AIGO_REDIS_URL || process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN,
})

// Create rate limiter
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    `${process.env.RATE_LIMIT_WINDOW || 60} s`
  ),
})

// Short URL functionality
export async function createShortUrl(fullUrl: string): Promise<string> {
  const id = Math.random().toString(36).substring(2, 8)
  await redis.set(`url:${id}`, fullUrl, { ex: 60 * 60 * 24 * 30 }) // 30 days
  return `${process.env.NEXT_PUBLIC_SITE_URL}/s/${id}`
}

export async function getFullUrl(id: string): Promise<string | null> {
  return redis.get<string>(`url:${id}`)
}