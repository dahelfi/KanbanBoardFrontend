import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {
    let auth = {token: true}

  return (
    auth.token ? <Outlet/> : <Navigate to="/auth/signin/"/>
  )
}
