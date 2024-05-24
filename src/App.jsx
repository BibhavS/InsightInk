import React from 'react'
import './App.css'
import config from './config/config'

function App() {
  console.log(config.appwriteUrl)
  return (
    <>
        <h1 className='mt-6 text-3xl text-slate-800 font-medium text-center'>InsightInk</h1>
    </>
  )
}

export default App
