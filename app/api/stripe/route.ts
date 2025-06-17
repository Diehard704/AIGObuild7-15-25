import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20'
})

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const {
      action,
      amount,
      credits,
      userID,
      email
    }: {
      action: 'create-checkout' | 'verify-session'
      amount?: number
      credits?: number
      userID?: string
      email?: string
    } = await req.json()

    if (action === 'create-checkout') {
      // Create Stripe checkout session for credit purchase
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${credits} App Generation Credits`,
                description: `Generate ${credits} AI applications with premium templates`,
              },
              unit_amount: amount! * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/pricing`,
        metadata: {
          userID: userID || 'anonymous',
          credits: credits?.toString() || '0',
          type: 'credit_purchase'
        },
        ...(email && { customer_email: email })
      })

      return new Response(
        JSON.stringify({ 
          sessionId: session.id,
          url: session.url 
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (action === 'verify-session') {
      const { sessionId } = await req.json()
      
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      
      if (session.payment_status === 'paid') {
        // In production, this would update the user's credit balance in database
        const creditsAwarded = parseInt(session.metadata?.credits || '0')
        
        return new Response(
          JSON.stringify({
            success: true,
            credits: creditsAwarded,
            userID: session.metadata?.userID
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }

      return new Response(
        JSON.stringify({ success: false }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Stripe error:', error)
    
    return new Response(
      JSON.stringify({
        error: 'Payment processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}