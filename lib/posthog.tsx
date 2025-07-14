'use client'

import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false,
    person_profiles: 'identified_only',
  })
}

export function PostHogPageview(): React.JSX.Element {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams])

  return <></>
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PostHogProvider>
  )
}