import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const IsRenter = ({children}) => {
    const user = useSelector((state)=>state.Auth.user)

    if(!user || user.role !== "Renter"){
        return <Navigate to="/" replace />
    }
   

  return children
}

export default IsRenter