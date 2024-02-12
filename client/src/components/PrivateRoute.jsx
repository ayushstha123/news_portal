import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {
    const {currentUser}=useSelector(state=>state.user)
  return currentUser ?  <Outlet/>:<Navigate to='/sigin'/>
}

export default PrivateRoute