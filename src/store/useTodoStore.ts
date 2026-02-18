import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo } from '@/types'

interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id'>) => void
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: [],
      addTodo: todo =>
        set(state => ({
          todos: [...state.todos, { ...todo, id: crypto.randomUUID() }]
        })),
      updateTodo: (id, updates) =>
        set(state => ({
          todos: state.todos.map(t =>
            t.id === id ? { ...t, ...updates } : t
          )
        })),
      deleteTodo: id =>
        set(state => ({
          todos: state.todos.filter(t => t.id !== id)
        })),
      toggleTodo: id =>
        set(state => ({
          todos: state.todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        }))
    }),
    { name: 'todo-store' }
  )
)
