import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const IsOwner = () => {
    const user = useSelector((state)=>state.Auth.user)
   

  return user?.role === "Owner" ? <Outlet /> : <Navigate to="/" />
}

export default IsOwner