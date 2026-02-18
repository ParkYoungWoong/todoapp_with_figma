import { Link } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import type { Todo } from '@/types'

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore(s => s.toggleTodo)

  return (
    <li className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3.5">
      <button
        type="button"
        onClick={() => toggleTodo(todo.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          todo.completed ? 'border-primary bg-primary' : 'border-label-sub'
        }`}>
        {todo.completed && (
          <svg
            className="h-3 w-3 text-label-on-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      <Link
        to={`/todo/${todo.id}`}
        className="min-w-0 flex-1">
        <span
          className={`block truncate ${todo.completed ? 'text-label-sub line-through' : ''}`}>
          {todo.title}
        </span>
      </Link>
    </li>
  )
}
