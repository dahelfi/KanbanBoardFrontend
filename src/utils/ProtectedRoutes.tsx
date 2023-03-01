import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Authcontext } from '../Provider/AuthProvider'

export const ProtectedRoutes = () => {
    const authenticationContext = useContext(Authcontext);

  return (
    authenticationContext.user ? <Outlet/> : <Navigate to="/auth/signin/"/>
  )
}
