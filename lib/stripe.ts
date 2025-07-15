import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const PRICING_PLANS = {
  free: {
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    features: [
      '3 AI generations per month',
      'Basic templates',
      'Community support',
      'Standard deployment'
    ],
    limits: {
      generations: 3,
      customizations: 5,
      storage: '100MB'
    }
  },
  pro: {
    name: 'Pro',
    description: 'For professional developers',
    price: 29,
    priceId: 'price_pro_monthly', // You'll need to create this in Stripe
    features: [
      'Unlimited AI generations',
      'Premium templates',
      'Priority support',
      'Advanced deployment',
      'Custom domains',
      'Team collaboration'
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
    priceId: 'price_enterprise_monthly', // You'll need to create this in Stripe
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee'
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
    name: 'AI Design Generator',
    description: 'Generate 5 custom design variations',
    price: 8,
    oneTime: true
  },
  performance_optimizer: {
    name: 'Performance Optimizer',
    description: 'Comprehensive performance analysis and optimization',
    price: 12,
    oneTime: true
  },
  mobile_optimizer: {
    name: 'Mobile Optimizer Pro',
    description: 'Perfect mobile experience with advanced responsive design',
    price: 15,
    oneTime: true
  },
  seo_optimizer: {
    name: 'SEO Optimizer Suite',
    description: 'Advanced SEO optimization with meta tags and schema markup',
    price: 18,
    oneTime: true
  },
  custom_feature: {
    name: 'Custom Feature Builder',
    description: 'Build any custom functionality you need',
    price: 25,
    oneTime: true
  }
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
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
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}

export async function getCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId)
  return customer
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}