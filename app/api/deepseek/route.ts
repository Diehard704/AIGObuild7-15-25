import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, context, userTier } = await request.json()

    // DeepSeek API integration
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant that provides support and strategically suggests premium features. Your role is to:
            1. Help users with their questions
            2. Naturally suggest relevant premium features that would solve their problems
            3. Use persuasive language that highlights value and urgency
            4. Always be helpful first, then suggest upgrades
            5. Tailor suggestions based on user tier: ${userTier}
            
            Available premium features to suggest:
            - AI Design Generator ($8) - Custom design variations
            - Performance Optimizer ($12) - Speed and performance improvements
            - Mobile Optimizer Pro ($15) - Mobile-first responsive design
            - SEO Optimizer Suite ($18) - Search engine optimization
            - Custom Feature Builder ($25) - Any custom functionality
            - Premium Plan ($29/month) - All features unlimited
            
            Be conversational, helpful, and subtly persuasive. Always end with a clear call-to-action.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    })

    if (!response.ok) {
      throw new Error('DeepSeek API request failed')
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // Analyze response to extract upsell opportunities
    const upsellData = extractUpsellData(aiResponse, message)

    return NextResponse.json({
      success: true,
      response: aiResponse,
      upsellData
    })

  } catch (error) {
    console.error('DeepSeek API error:', error)
    
    // Fallback response with upselling
    const fallbackResponse = generateFallbackResponse(await request.json())
    
    return NextResponse.json({
      success: true,
      response: fallbackResponse.response,
      upsellData: fallbackResponse.upsellData
    })
  }
}

function extractUpsellData(response: string, userMessage: string) {
  // Smart upsell detection based on AI response and user message
  const keywords = userMessage.toLowerCase()
  
  if (keywords.includes('design') || keywords.includes('style') || keywords.includes('color')) {
    return {
      feature: 'AI Design Generator',
      price: 8,
      savings: '3+ hours of design work',
      urgency: 'Limited time: 40% off',
      cta: 'Generate Designs Now'
    }
  }
  
  if (keywords.includes('slow') || keywords.includes('performance') || keywords.includes('speed')) {
    return {
      feature: 'Performance Optimizer',
      price: 12,
      savings: '60-80% faster load times',
      urgency: 'Today only: Free performance report',
      cta: 'Optimize Now'
    }
  }
  
  if (keywords.includes('mobile') || keywords.includes('responsive')) {
    return {
      feature: 'Mobile Optimizer Pro',
      price: 15,
      savings: 'Mobile conversions +65%',
      urgency: 'Flash sale: 50% off',
      cta: 'Make It Mobile-Perfect'
    }
  }
  
  if (keywords.includes('seo') || keywords.includes('search')) {
    return {
      feature: 'SEO Optimizer Suite',
      price: 18,
      savings: '3-5x more organic traffic',
      urgency: 'Free keyword research included',
      cta: 'Boost My Rankings'
    }
  }
  
  // Default upsell
  return {
    feature: 'Premium Plan',
    price: 29,
    savings: 'Unlimited everything',
    urgency: 'First month 50% off',
    cta: 'Upgrade Now'
  }
}

function generateFallbackResponse(requestData: any) {
  const { message, userTier } = requestData
  
  const fallbackResponses = [
    {
      response: "I'd love to help you with that! As your AI assistant, I can provide guidance and suggestions. For more advanced customizations, I have premium tools that can automate complex tasks and save you hours of work.",
      upsellData: {
        feature: 'AI Automation Suite',
        price: 15,
        savings: 'Save 5+ hours of manual work',
        urgency: 'Special offer: 30% off today',
        cta: 'Try Premium Tools'
      }
    },
    {
      response: "Great question! I can definitely help with that. I notice you're working on some interesting customizations. Would you like me to show you how I can generate professional-level improvements automatically?",
      upsellData: {
        feature: 'Professional Generator',
        price: 20,
        savings: 'Professional results in minutes',
        urgency: 'Limited time: Includes bonus features',
        cta: 'Go Professional'
      }
    }
  ]
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
}