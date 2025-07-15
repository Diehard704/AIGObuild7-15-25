import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
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
        const subscriptionCreated = event.data.object as Stripe.Subscription
        console.log('Subscription created:', subscriptionCreated.id)
        // Handle subscription creation
        await handleSubscriptionCreated(subscriptionCreated)
        break

      case 'customer.subscription.updated':
        const subscriptionUpdated = event.data.object as Stripe.Subscription
        console.log('Subscription updated:', subscriptionUpdated.id)
        // Handle subscription update
        await handleSubscriptionUpdated(subscriptionUpdated)
        break

      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object as Stripe.Subscription
        console.log('Subscription deleted:', subscriptionDeleted.id)
        // Handle subscription cancellation
        await handleSubscriptionDeleted(subscriptionDeleted)
        break

      case 'checkout.session.completed':
        const checkoutSession = event.data.object as Stripe.Checkout.Session
        console.log('Checkout completed:', checkoutSession.id)
        // Handle successful payment
        await handleCheckoutCompleted(checkoutSession)
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('Invoice payment succeeded:', invoice.id)
        // Handle successful payment
        await handleInvoicePaymentSucceeded(invoice)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('Invoice payment failed:', failedInvoice.id)
        // Handle failed payment
        await handleInvoicePaymentFailed(failedInvoice)
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

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Update user subscription status in your database
  console.log('Handling subscription created:', subscription.id)
  // TODO: Update database with subscription info
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Update user subscription status in your database
  console.log('Handling subscription updated:', subscription.id)
  // TODO: Update database with subscription changes
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Handle subscription cancellation
  console.log('Handling subscription deleted:', subscription.id)
  // TODO: Update database to reflect cancelled subscription
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Handle successful checkout
  console.log('Handling checkout completed:', session.id)
  // TODO: Update database with payment info
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // Handle successful payment
  console.log('Handling invoice payment succeeded:', invoice.id)
  // TODO: Update database with payment success
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  // Handle failed payment
  console.log('Handling invoice payment failed:', invoice.id)
  // TODO: Update database with payment failure
}