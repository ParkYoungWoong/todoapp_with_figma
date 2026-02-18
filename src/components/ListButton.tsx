import type { ButtonHTMLAttributes } from 'react'
import Icon from '@/components/Icon'

const variants = {
  default:
    'bg-secondary border border-transparent hover:brightness-95 dark:hover:brightness-110',
  active: 'bg-primary/10 text-primary border border-transparent',
  danger:
    'text-danger bg-danger-bg border border-transparent hover:brightness-95 dark:hover:brightness-110'
}

interface ListButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  icon: string
  label: string
  trailing?: string
}

export default function ListButton({
  variant = 'default',
  icon,
  label,
  trailing,
  className = '',
  ...props
}: ListButtonProps) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 transition-colors ${variants[variant]} ${className}`}
      {...props}>
      <Icon
        name={icon}
        size={22}
      />
      <span className="flex-1 text-left">{label}</span>
      {trailing && (
        <Icon
          name={trailing}
          size={20}
          className="text-label-sub"
        />
      )}
    </button>
  )
}
