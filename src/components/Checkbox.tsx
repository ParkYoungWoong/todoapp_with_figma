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
        <svg
          className="text-label-on-primary h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}>
          {checked ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14"
            />
          )}
        </svg>
      )}
    </button>
  )
}
