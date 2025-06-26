'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

// Define and export ViewType for Supabase Auth UI
export type ViewType =
  | 'sign_in'
  | 'sign_up'
  | 'forgotten_password'
  | 'magic_link'
  | 'update_password'

// Extend AuthComponent to accept all props needed by Supabase Auth
export function AuthComponent({
  supabaseClient = supabase,
  view,
  providers = ['github', 'google'],
  socialLayout = 'horizontal',
  ...props
}: {
  supabaseClient?: any
  view?: ViewType
  providers?: Array<'apple' | 'azure' | 'bitbucket' | 'discord' | 'facebook' | 'figma' | 'github' | 'gitlab' | 'google' | 'kakao' | 'keycloak' | 'linkedin' | 'linkedin_oidc' | 'notion' | 'slack' | 'slack_oidc' | 'spotify' | 'twitch' | 'twitter' | 'workos' | 'zoom' | 'fly'>
  socialLayout?: 'horizontal' | 'vertical'
  [key: string]: any
}) {
  return (
    <div className="max-w-md mx-auto">
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={providers}
        theme="dark"
        view={view}
        socialLayout={socialLayout}
        {...props}
      />
    </div>
  )
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
