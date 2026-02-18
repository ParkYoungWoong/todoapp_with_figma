import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from '@/pages/HomePage'
import AddTodoPage from '@/pages/AddTodoPage'
import TodoDetailPage from '@/pages/TodoDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/add"
          element={<AddTodoPage />}
        />
        <Route
          path="/todo/:id"
          element={<TodoDetailPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}
