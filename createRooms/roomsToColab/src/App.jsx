import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <>
      <Toaster position='top-right' toastOptions={{success: { style: { background: '#713200', color: '#FFFAEE' }}}}></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor-room/:roomId" element={<EditorPage />} />
      </Routes>
    </>
  )
}

export default App
