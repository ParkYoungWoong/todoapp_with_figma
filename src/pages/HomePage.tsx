import { Link } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import TodoItem from '@/components/TodoItem'

export default function HomePage() {
  const todos = useTodoStore(s => s.todos)

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-24 pt-12">
      <h1 className="text-2xl font-bold">할 일</h1>

      {todos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-label-sub">할 일을 추가해 보세요</p>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      )}

      <Link
        to="/add"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-light text-label-on-primary shadow-lg transition-transform active:scale-95">
        +
      </Link>
    </div>
  )
}
