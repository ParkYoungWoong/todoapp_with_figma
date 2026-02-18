import { Link } from 'react-router'
import Icon from '@/components/Icon'

interface FloatingActionButtonProps {
  to: string
}

export default function FloatingActionButton({
  to
}: FloatingActionButtonProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0">
      <div className="mx-auto flex max-w-lg justify-end px-5 pb-6">
        <Link
          to={to}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-label-on-primary shadow-lg transition-all hover:brightness-110 active:scale-95">
          <Icon
            name="add"
            size={30}
          />
        </Link>
      </div>
    </div>
  )
}
