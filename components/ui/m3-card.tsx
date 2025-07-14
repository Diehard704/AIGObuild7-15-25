import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const m3CardVariants = cva(
    'transition-all duration-200',
    {
        variants: {
            variant: {
                elevated: 'm3-card-elevated hover:shadow-lg',
                filled: 'm3-card-filled',
                outlined: 'm3-card-outlined',
            },
            padding: {
                none: 'p-0',
                sm: 'p-4',
                md: 'p-6',
                lg: 'p-8',
            },
        },
        defaultVariants: {
            variant: 'elevated',
            padding: 'md',
        },
    }
)

export interface M3CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof m3CardVariants> { }

const M3Card = React.forwardRef<HTMLDivElement, M3CardProps>(
    ({ className, variant, padding, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(m3CardVariants({ variant, padding, className }))}
            {...props}
        />
    )
)
M3Card.displayName = 'M3Card'

const M3CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
))
M3CardHeader.displayName = 'M3CardHeader'

const M3CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('m3-title-large text-foreground', className)}
        {...props}
    />
))
M3CardTitle.displayName = 'M3CardTitle'

const M3CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('m3-body-medium text-muted-foreground', className)}
        {...props}
    />
))
M3CardDescription.displayName = 'M3CardDescription'

const M3CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
M3CardContent.displayName = 'M3CardContent'

const M3CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
))
M3CardFooter.displayName = 'M3CardFooter'

export { M3Card, M3CardHeader, M3CardFooter, M3CardTitle, M3CardDescription, M3CardContent } 