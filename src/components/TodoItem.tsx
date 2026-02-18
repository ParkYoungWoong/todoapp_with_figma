import { Link } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import Checkbox from '@/components/Checkbox'
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
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {todo.date}
          </span>
        </div>
        {todo.memo && (
          <svg
            className="text-label-sub/50 h-5 w-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        )}
      </Link>
    </li>
  )
}
