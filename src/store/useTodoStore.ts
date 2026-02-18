import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo } from '@/types'
import sampleTodos from '@/data/sampleTodos.json'

interface TodoStore {
  todos: Todo[]
  addTodo: (todo: Omit<Todo, 'id'>) => void
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => void
  deleteTodo: (id: string) => void
  toggleTodo: (id: string) => void
  setCompleted: (ids: string[], completed: boolean) => void
  deleteCompleted: () => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    set => ({
      todos: sampleTodos,
      addTodo: todo =>
        set(state => ({
          todos: [...state.todos, { ...todo, id: crypto.randomUUID() }]
        })),
      updateTodo: (id, updates) =>
        set(state => ({
          todos: state.todos.map(t => (t.id === id ? { ...t, ...updates } : t))
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
        })),
      setCompleted: (ids, completed) =>
        set(state => ({
          todos: state.todos.map(t =>
            ids.includes(t.id) ? { ...t, completed } : t
          )
        })),
      deleteCompleted: () =>
        set(state => ({
          todos: state.todos.filter(t => !t.completed)
        }))
    }),
    { name: 'todo-store' }
  )
)
