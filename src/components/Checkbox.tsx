import Icon from '@/components/Icon'

interface CheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onClick: (e: React.MouseEvent) => void
  className?: string
}

export default function Checkbox({
  checked,
  indeterminate = false,
  onClick,
  className = ''
}: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${
        checked
          ? 'border-primary bg-primary'
          : indeterminate
            ? 'border-primary/50 bg-primary/30'
            : 'border-label-sub/30'
      } ${className}`}>
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
