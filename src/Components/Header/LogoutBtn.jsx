import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
        navigate('/')
    })
  }
  return (
    <button className='py-2 px-4 bg-slate-900 text-white font-medium text-xl rounded-lg ml-6' onClick={logoutHandler}>Logout</button>
  )
}
