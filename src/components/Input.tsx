import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="text-label-sub mb-2 block text-sm">{label}</label>
      )}
      <input
        className={`border-border bg-secondary placeholder:text-label-sub/50 focus:border-primary w-full rounded-xl border px-4 py-3 outline-none ${className}`}
        {...props}
      />
    </div>
  )
}
