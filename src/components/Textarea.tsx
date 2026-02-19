import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export default function Textarea({
  label,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="text-label-sub mb-2 block text-sm">{label}</label>
      )}
      <textarea
        className={`border-border bg-secondary placeholder:text-label-sub/50 focus:border-primary w-full resize-none rounded-xl border px-4 py-3 outline-none ${className}`}
        {...props}
      />
    </div>
  )
}
