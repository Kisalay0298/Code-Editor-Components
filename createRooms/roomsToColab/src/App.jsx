import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
import { Toaster } from 'react-hot-toast'



function App() {
  const [joined, setJoined] = useState(false)

  return (
    <>
      <Toaster position='top-right' toastOptions={{success: { style: { background: '#713200', color: '#FFFAEE' }}}}></Toaster>
      <Routes>
        <Route path="/" element={<Home setJoined={setJoined} />} />
        <Route path="/editor-room/:roomId" element={<EditorPage />} />

        <Route path="*" element={<div className="text-white p-10">404 - Page Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
