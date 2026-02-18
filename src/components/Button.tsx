import type { ButtonHTMLAttributes } from 'react'

const variants = {
  primary:
    'bg-primary text-label-on-primary hover:brightness-110 disabled:opacity-40',
  danger:
    'bg-danger-bg text-danger hover:brightness-95 dark:hover:brightness-110'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-xl py-4 font-semibold transition-all ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  )
}
