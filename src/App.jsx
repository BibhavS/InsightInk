import React from 'react'
import './App.css'

function App() {
  console.log(process.env.REACT_APP_APPWRITE_URL)
  return (
    <>
       <Navbar/>
    </>
  )
}

export default App
