import { Link } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import Checkbox from '@/components/Checkbox'
import Icon from '@/components/Icon'
import type { Todo } from '@/types'

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore(s => s.toggleTodo)

  return (
    <li>
      <Link
        to={`/todo/${todo.id}`}
        className="border-border bg-secondary flex items-start gap-3 rounded-2xl border p-4 transition-colors hover:brightness-95 dark:hover:brightness-110">
        <Checkbox
          checked={todo.completed}
          onClick={e => {
            e.preventDefault()
            toggleTodo(todo.id)
          }}
          className="mt-[3px]"
        />
        <div className="min-w-0 flex-1">
          <span
            className={`block truncate text-[1.05rem] ${todo.completed ? 'text-label-sub line-through' : ''}`}>
            {todo.title}
          </span>
          <span className="text-label/50 mt-1.5 flex items-center gap-1 text-sm leading-none">
            {todo.date}
          </span>
        </div>
        {todo.memo && (
          <Icon
            name="description"
            size={20}
            className="text-label-sub/50"
          />
        )}
      </Link>
    </li>
  )
}
