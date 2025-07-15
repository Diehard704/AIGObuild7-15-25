import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession, createOneTimePayment, createCustomer, PRICING_PLANS, UPSELL_FEATURES } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId, featureId, isUpgrade = false } = await request.json()

    // Create or get customer
    const customer = await createCustomer(session.user.email!, session.user.name!)
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
    const successUrl = `${baseUrl}/dashboard?payment=success`
    const cancelUrl = `${baseUrl}/pricing?payment=canceled`

    let checkoutSession

    if (featureId) {
      // One-time feature purchase
      const feature = UPSELL_FEATURES[featureId as keyof typeof UPSELL_FEATURES]
      if (!feature) {
        return NextResponse.json({ error: 'Feature not found' }, { status: 404 })
      }

      checkoutSession = await createOneTimePayment(
        customer.id,
        feature.price,
        feature.name,
        `${baseUrl}/dashboard?feature=${featureId}&payment=success`,
        cancelUrl
      )
    } else if (planId) {
      // Subscription plan
      const plan = PRICING_PLANS[planId as keyof typeof PRICING_PLANS]
      if (!plan) {
        return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
      }

      // Free plan doesn't require payment
      if (planId === 'free') {
        return NextResponse.json({
          success: true,
          checkoutUrl: `${baseUrl}/dashboard?payment=success&plan=free`,
          sessionId: 'free_plan'
        })
      }

      if (!('priceId' in plan) || !plan.priceId) {
        return NextResponse.json({ error: 'Plan not available for purchase' }, { status: 404 })
      }

      checkoutSession = await createCheckoutSession(
        customer.id,
        plan.priceId,
        successUrl,
        cancelUrl
      )
    } else {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    )
  }
}