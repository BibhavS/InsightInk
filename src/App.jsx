import React, { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import loadingGif from './assets/loadingIcon.gif';
import { Header, Footer } from './Components';
import { fetchPosts } from './store/postSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
          dispatch(fetchPosts())
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))

  }, [])

  return !loading ? (
    <>
      <div className='min-h-screen flex flex-col flex-wrap content-between'>
        <div className='w-full flex flex-col min-h-screen'>
          <Header />
          <main className='flex flex-grow items-center justify-center'>
             <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (<div className=' flex justify-center'>
    <img src={loadingGif} alt="loading" />
  </div>
  )

}

export default App
