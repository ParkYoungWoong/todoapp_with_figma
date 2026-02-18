import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration
} from 'react-router'
import { useAuthStore } from '@/store/useAuthStore'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import HomePage from '@/pages/HomePage'
import AddTodoPage from '@/pages/AddTodoPage'
import TodoDetailPage from '@/pages/TodoDetailPage'
import SettingsPage from '@/pages/SettingsPage'

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

function PrivateRoute() {
  const user = useAuthStore(s => s.user)
  if (!user) return <Navigate to="/login" />
  return <Outlet />
}

function PublicRoute() {
  const user = useAuthStore(s => s.user)
  if (user) return <Navigate to="/" />
  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignupPage /> }
        ]
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/add', element: <AddTodoPage /> },
          { path: '/todo/:id', element: <TodoDetailPage /> },
          { path: '/settings', element: <SettingsPage /> }
        ]
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
