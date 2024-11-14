import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useSelector(selectAuth)

  return auth.token ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
