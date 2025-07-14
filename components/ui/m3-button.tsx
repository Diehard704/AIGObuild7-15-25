import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const m3ButtonVariants = cva(
    'm3-ripple inline-flex items-center justify-center whitespace-nowrap rounded-md m3-title-medium font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                elevated: 'm3-button-elevated hover:m3-state-hover active:m3-state-pressed',
                filled: 'm3-button-filled hover:m3-state-hover active:m3-state-pressed',
                tonal: 'm3-button-tonal hover:m3-state-hover active:m3-state-pressed',
                outlined: 'm3-button-outlined hover:m3-state-hover active:m3-state-pressed',
                text: 'm3-button-text hover:m3-state-hover active:m3-state-pressed',
            },
            size: {
                default: 'h-10 px-6 py-2',
                sm: 'h-8 px-4 py-1.5',
                lg: 'h-12 px-8 py-3',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'filled',
            size: 'default',
        },
    }
)

export interface M3ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof m3ButtonVariants> {
    asChild?: boolean
}

const M3Button = React.forwardRef<HTMLButtonElement, M3ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(m3ButtonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
M3Button.displayName = 'M3Button'

export { M3Button, m3ButtonVariants } 