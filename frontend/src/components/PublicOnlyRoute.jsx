import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicOnlyRoute() {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  return user ? <Navigate to="/" replace /> : <Outlet />
}
