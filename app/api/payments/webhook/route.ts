import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  // In non-configured environments (e.g., local builds), no-op to avoid failures
  if (!secretKey || !endpointSecret) {
    return NextResponse.json({ received: true })
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: '2025-02-24.acacia',
  })

  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
        // Handle subscription creation
        break
      case 'customer.subscription.updated':
        // Handle subscription update
        break
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break
      case 'checkout.session.completed':
        // Handle successful payment
        break
      case 'invoice.payment_succeeded':
        // Handle successful payment
        break
      case 'invoice.payment_failed':
        // Handle failed payment
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}