import { useState } from 'react'
import { useTodoStore } from '@/store/useTodoStore'
import TodoItem from '@/components/TodoItem'
import Checkbox from '@/components/Checkbox'
import FilterTabs, { type Filter } from '@/components/FilterTabs'
import FloatingActionButton from '@/components/FloatingActionButton'

export default function HomePage() {
  const todos = useTodoStore(s => s.todos)
  const setCompleted = useTodoStore(s => s.setCompleted)
  const deleteCompleted = useTodoStore(s => s.deleteCompleted)
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const allChecked =
    filteredTodos.length > 0 && filteredTodos.every(t => t.completed)
  const someChecked = !allChecked && filteredTodos.some(t => t.completed)

  const handleToggleAll = () => {
    const ids = filteredTodos.map(t => t.id)
    setCompleted(ids, !allChecked)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pt-12 pb-24">
      <h1 className="text-2xl font-bold">할 일</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {filteredTodos.length > 0 && (
          <div className="rounded-lg py-1.5 pr-2 pl-[17px]">
            <Checkbox
              checked={allChecked}
              indeterminate={someChecked}
              onClick={handleToggleAll}
            />
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <FilterTabs
            value={filter}
            onChange={setFilter}
          />
          {todos.some(t => t.completed) && (
            <button
              type="button"
              onClick={deleteCompleted}
              className="text-danger flex h-8 w-8 items-center justify-center rounded-lg transition-opacity hover:opacity-70">
              <svg
                className="h-[18px] w-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-label-sub">
            {todos.length === 0 ? '할 일을 추가해 보세요' : '항목이 없습니다'}
          </p>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      )}

      <FloatingActionButton to="/add" />
    </div>
  )
}
