import Stripe from 'stripe'

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })
  : undefined as unknown as Stripe

export const PRICING_PLANS = {
  free: {
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      '5 AI generations per month',
      'Basic templates',
      'Community support',
      'Standard deployment',
      'Basic customization'
    ],
    limits: {
      generations: 5,
      customizations: 10,
      storage: '100MB'
    }
  },
  pro: {
    name: 'Pro',
    description: 'For professional developers',
    price: 29,
    priceId: 'price_1QXxuZP0ep9FhchgRyGnpJ8z', // Real Stripe price ID
    features: [
      'Unlimited AI generations',
      'Premium templates',
      'Priority support',
      'Advanced deployment',
      'Custom domains',
      'Team collaboration',
      'Advanced AI features',
      'Performance optimization'
    ],
    limits: {
      generations: Infinity,
      customizations: Infinity,
      storage: '10GB'
    }
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large teams and organizations',
    price: 99,
    priceId: 'price_1QXxuZP0ep9FhchgRyGnpJ8z', // Real Stripe price ID
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'White-label options',
      'Custom AI training'
    ],
    limits: {
      generations: Infinity,
      customizations: Infinity,
      storage: '100GB'
    }
  }
}

export const UPSELL_FEATURES = {
  design_generator: {
    name: 'AI Design Studio Pro',
    description: 'Generate 10 custom design variations with advanced styling',
    price: 19,
    oneTime: true,
    features: ['10 design variations', 'Color palette generator', 'Typography optimization', 'Mobile-first design']
  },
  performance_optimizer: {
    name: 'Performance Rocket',
    description: 'Comprehensive performance optimization and monitoring',
    price: 25,
    oneTime: true,
    features: ['Performance analysis', 'Code optimization', 'Asset optimization', 'CDN integration']
  },
  mobile_optimizer: {
    name: 'Mobile Optimizer Pro',
    description: 'Perfect mobile experience with advanced responsive design',
    price: 22,
    oneTime: true,
    features: ['Mobile-first design', 'Touch interactions', 'Performance optimization', 'App-like experience']
  },
  seo_optimizer: {
    name: 'SEO Optimizer Suite',
    description: 'Advanced SEO optimization with meta tags and schema markup',
    price: 28,
    oneTime: true,
    features: ['SEO analysis', 'Meta tag optimization', 'Schema markup', 'Performance tracking']
  },
  custom_feature: {
    name: 'Custom Feature Builder',
    description: 'Build any custom functionality you need with AI assistance',
    price: 49,
    oneTime: true,
    features: ['Custom development', 'API integrations', 'Database design', 'Advanced features']
  },
  ai_assistant: {
    name: 'AI Assistant Pro',
    description: 'Unlimited AI assistance and code optimization',
    price: 35,
    oneTime: true,
    features: ['Unlimited AI chat', 'Code review', 'Bug fixes', 'Feature suggestions']
  }
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) throw new Error('Stripe not configured')
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  })

  return session
}

export async function createOneTimePayment(
  customerId: string,
  amount: number,
  description: string,
  successUrl: string,
  cancelUrl: string
) {
  if (!stripe) throw new Error('Stripe not configured')
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: description,
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}

export async function createCustomer(email: string, name: string) {
  if (!stripe) throw new Error('Stripe not configured')
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}

export async function getCustomer(customerId: string) {
  if (!stripe) throw new Error('Stripe not configured')
  const customer = await stripe.customers.retrieve(customerId)
  return customer
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  if (!stripe) throw new Error('Stripe not configured')
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}