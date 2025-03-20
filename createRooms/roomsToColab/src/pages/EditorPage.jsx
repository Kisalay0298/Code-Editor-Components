import React, { useState } from 'react'
import LogoSticker from '../components/LogoSticker'
import Client from '../components/Client'
import Editor from '../components/Editor'

const EditorPage = () => {

  const [clients, setClients] = useState([{ socketID: Math.floor(Math.random() * 1000), userName: "Kisalay Komal" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Neel Kamal" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Aryan Raj" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Priya Sharma" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Rahul Singh" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Aarav Verma" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Sneha Pandey" },
    { socketID: Math.floor(Math.random() * 1000), userName: "Ananya Gupta" },
    // { socketID: Math.floor(Math.random() * 1000), userName: "Rohan Mehta" },
    // { socketID: Math.floor(Math.random() * 1000), userName: "Ishaan Tiwari" }
  ])

  return (
    <div className="min-h-screen flex flex-row bg-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="border-r w-72 h-screen flex flex-col items-center justify-between py-4">
        {/* Logo and Header */}
        <div className="w-full flex flex-col items-center">
          <div className="w-80 transform scale-75 -mt-4">
            <LogoSticker />
            <div className="h-0.5 border-gray-500 border-b -mt-6 w-5/6 mx-auto"></div>
          </div>

        {/* Connected Users Section */}
        <div className="w-full px-6">
          <h3 className="text-gray-300 font-semibold text-lg ml-3 pb-1">Connected</h3>
          <div className="flex-1 text-gray-400 text-sm space-y-2 h-125 overflow-y-auto scrollbar-hide shadow-lg rounded-lg">
            {
              clients.map((client, idx) => (
                <Client key={idx} socketID={client.socketID} userName={client.userName} />
              ))
            }
          </div>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col mb-5 gap-4 w-3/4">
      <button className="w-full h-12 font-bold bg-gray-50 rounded-lg cursor-pointer shadow-md hover:bg-gray-300 hover:shadow-lg active:scale-95 transition duration-300">
        Copy ROOM ID
      </button>
      <button className="w-full h-12 font-bold bg-orange-300 rounded-lg cursor-pointer shadow-md hover:bg-orange-500 hover:shadow-lg active:scale-95 transition duration-300">
        Leave
      </button>
    </div>
  </div>

  {/* Main Editor Section */}
  <div className="flex-1 text-lg">
    <Editor />
  </div>
</div>

  )
}

export default EditorPage