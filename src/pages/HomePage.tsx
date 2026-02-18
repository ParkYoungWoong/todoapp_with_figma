import { useState } from 'react'
import { useTodoStore } from '@/store/useTodoStore'
import TodoItem from '@/components/TodoItem'
import Checkbox from '@/components/Checkbox'
import Button from '@/components/Button'
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
