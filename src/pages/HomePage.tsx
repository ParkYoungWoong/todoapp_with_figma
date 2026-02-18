import { useState } from 'react'
import { Link } from 'react-router'
import { useTodoStore } from '@/store/useTodoStore'
import { useAuthStore } from '@/store/useAuthStore'
import TodoItem from '@/components/TodoItem'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
import FilterTabs, { type Filter } from '@/components/FilterTabs'
import FloatingActionButton from '@/components/FloatingActionButton'

export default function HomePage() {
  const todos = useTodoStore(s => s.todos)
  const setCompleted = useTodoStore(s => s.setCompleted)
  const deleteCompleted = useTodoStore(s => s.deleteCompleted)
  const user = useAuthStore(s => s.user)

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
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
      <div className="flex items-center justify-between">
        <Link
          to="/settings"
          className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <img
            src={user?.profileImage}
            alt="프로필"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-bold">{user?.name}</span>
        </Link>
        <p className="text-label-sub text-sm">{today}</p>
      </div>

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
            <Button
              variant="danger"
              size="sm"
              icon="delete"
              onClick={deleteCompleted}
            />
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
