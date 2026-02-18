import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useAuthStore } from '@/store/useAuthStore'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import AddTodoPage from '@/pages/AddTodoPage'
import TodoDetailPage from '@/pages/TodoDetailPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(s => s.user)
  if (!user) return <Navigate to="/login" />
  return children
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(s => s.user)
  if (user) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddTodoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/todo/:id"
          element={
            <PrivateRoute>
              <TodoDetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
