import type { CSSProperties } from 'react'

interface IconProps {
  name: string
  size?: number
  className?: string
  style?: CSSProperties
}

export default function Icon({ name, size, className = '', style }: IconProps) {
  return (
    <span
      className={`material-symbols-rounded leading-none ${className}`}
      style={{ fontSize: size, ...style }}>
      {name}
    </span>
  )
}
