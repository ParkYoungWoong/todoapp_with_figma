import { Link } from 'react-router'
import Icon from '@/components/Icon'

interface FloatingActionButtonProps {
  to?: string
  icon?: string
  onClick?: () => void
}

export default function FloatingActionButton({
  to,
  icon = 'add',
  onClick
}: FloatingActionButtonProps) {
  const className =
    'bg-primary text-label-on-primary pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:brightness-110 active:scale-95'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0">
      <div className="mx-auto flex max-w-lg justify-end px-5 pb-6">
        {to ? (
          <Link
            to={to}
            className={className}>
            <Icon
              name={icon}
              size={30}
            />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className={className}>
            <Icon
              name={icon}
              size={30}
            />
          </button>
        )}
      </div>
    </div>
  )
}
