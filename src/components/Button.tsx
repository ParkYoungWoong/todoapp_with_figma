import type { ButtonHTMLAttributes } from 'react'
import Icon from '@/components/Icon'

const variants = {
  primary:
    'bg-primary text-label-on-primary hover:brightness-110 disabled:opacity-40',
  danger:
    'bg-danger-bg text-danger hover:brightness-95 dark:hover:brightness-110',
  secondary:
    'bg-secondary text-label-on-secondary hover:brightness-95 dark:hover:brightness-110',
  ghost: 'text-label-on-secondary hover:bg-secondary'
}

const sizes = {
  md: 'min-h-[50px] rounded-xl px-5 font-semibold',
  sm: 'min-h-8 rounded-lg px-3.5 text-sm font-medium'
}

const iconSizes = {
  md: 26,
  sm: 18
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  icon?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex shrink-0 cursor-pointer items-center justify-center gap-2 transition-all disabled:cursor-default ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}>
      {icon && (
        <Icon
          name={icon}
          size={iconSizes[size]}
        />
      )}
      {children}
    </button>
  )
}
