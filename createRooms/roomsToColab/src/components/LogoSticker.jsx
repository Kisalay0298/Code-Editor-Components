import React from 'react'
import logo from '../assets/CodeEditorLogo.png';

const LogoSticker = () => {
  return (
    <>
        <div className="flex items-center mb-8 text-white">
            <img src={logo} alt="code-editor-logo" className="w-16 h-16 mr-2 rounded-md" />
            <div className="flex ml-1 mr-2 w-[2px] h-10 bg-gray-600"></div>
            <div className="flex flex-col">
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }} className="text-2xl font-semibold text-gray-300 -mb-1">Online Code Editor
            </h1>
            <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 200 }} className="text-sm text-green-500">Collab Your Code</p>
            </div>
        </div>
    </>
  )
}

export default LogoSticker