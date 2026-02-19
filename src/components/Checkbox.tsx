import type { ButtonHTMLAttributes } from 'react'
import Icon from '@/components/Icon'

interface CheckboxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  indeterminate?: boolean
}

export default function Checkbox({
  checked,
  indeterminate = false,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <button
      type="button"
      className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 transition-colors disabled:cursor-default disabled:opacity-30 ${
        checked
          ? 'border-primary bg-primary'
          : indeterminate
            ? 'border-primary/50 bg-primary'
            : 'border-label-sub/30'
      } ${className}`}
      {...props}>
      {(checked || indeterminate) && (
        <Icon
          name={checked ? 'check' : 'remove'}
          size={20}
          className="text-label-on-primary"
          style={{
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20"
          }}
        />
      )}
    </button>
  )
}
