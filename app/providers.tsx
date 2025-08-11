'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ph, setPh] = useState<any>(null)
  const [PHProvider, setPHProvider] = useState<any>(null)

  useEffect(() => {
    let didCancel = false
    async function setup() {
      if (!process.env.NEXT_PUBLIC_ENABLE_POSTHOG) return
      const [{ default: posthog }, phReact] = await Promise.all([
        import('posthog-js'),
        import('posthog-js/react'),
      ])
      if (didCancel) return
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only',
        session_recording: {
          recordCrossOriginIframes: true,
        },
      })
      setPh(posthog)
      setPHProvider(() => phReact.PostHogProvider)
    }
    setup()
    return () => {
      didCancel = true
    }
  }, [])

  if (!process.env.NEXT_PUBLIC_ENABLE_POSTHOG || !ph || !PHProvider) {
    return children as React.ReactElement
  }
  return <PHProvider client={ph}>{children}</PHProvider>
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function AuthProvider({ children, session }: { children: React.ReactNode, session: Session | null }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
