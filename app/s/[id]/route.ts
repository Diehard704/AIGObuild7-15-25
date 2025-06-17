import { getFullUrl } from '@/lib/upstash'
import { redirect } from 'next/navigation'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const url = await getFullUrl(params.id)
    
    if (!url) {
      return new Response('Short URL not found', { status: 404 })
    }
    
    return redirect(url)
  } catch (error) {
    console.error('Error retrieving short URL:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}