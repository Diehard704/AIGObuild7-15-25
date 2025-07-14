import { AuthComponent } from './auth'
import type { ViewType } from '@/lib/auth'
import Logo from './logo'
import { validateEmail } from '@/app/actions/validate-email'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { SupabaseClient } from '@supabase/supabase-js'
import { motion } from 'framer-motion'
import { Sparkles, Shield } from 'lucide-react'

export function AuthDialog({
  open,
  setOpen,
  supabase,
  view,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  supabase: SupabaseClient
  view: ViewType
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-surface-container border border-outline rounded-2xl p-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Sign in to Fragments</DialogTitle>
          <DialogDescription>
            Sign in or create an account to access Fragments
          </DialogDescription>
        </VisuallyHidden>

        <div className="flex justify-center items-center flex-col p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center justify-center rounded-xl shadow-lg bg-primary p-3">
                <Logo className="text-primary-foreground w-8 h-8" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h1 className="m3-headline-medium font-bold text-foreground">
                  FragmentsPro
                </h1>
              </div>
            </div>

            <h2 className="m3-title-large font-semibold text-foreground mb-2">
              Welcome to FragmentsPro
            </h2>
            <p className="m3-body-medium text-muted-foreground mb-6">
              Sign in to start building amazing AI-powered applications
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Secure authentication powered by Supabase</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-sm"
          >
            <AuthComponent
              supabaseClient={supabase}
              view={view}
              providers={['github', 'google']}
              socialLayout="horizontal"
            />
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
