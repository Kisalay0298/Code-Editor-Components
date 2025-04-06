import React, { useEffect, useState } from 'react'
import LogoSticker from '../components/LogoSticker'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import socket from '../../src/utils/socket'
import { getUserId } from '../../src/utils/getUserId'
import { v4 as uuidv4 } from 'uuid';


const Home = ({ setJoined }) => {

  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()
  const userId = getUserId()

    const createNewRoom = (e) => {
      e.preventDefault()
      const id = uuidv4()
      setRoomId(id)
      localStorage.setItem('adminId', userId)
      toast.success('New room id created')
    }

    const joinRoom = (e) => {
      console.log(userName, roomId)
      e.preventDefault()
      if (!roomId || !userName) {
        toast.error('Please enter both room id and username')
        return
      }
      socket.emit('join', {roomId, userName, userId})
      setJoined(true)
      navigate(`/editor-room/${roomId}`, {state: {userName}})
    }

    const handleInputOnPressingEnter = (event)=>{
      if (event.key === 'Enter') {
        joinRoom(event)
      }
    }

    useEffect(() => {
      if (roomId) {
        console.log("📦 Updated roomId in useEffect:", roomId);
      }
    }, [roomId]);

    useEffect(() => {
      const lastRoom = localStorage.getItem('roomId');
      if (lastRoom) setRoomId(lastRoom);
    }, []);
    
    useEffect(() => {
      if (roomId) {
        localStorage.setItem('roomId', roomId);
      }
    }, [roomId]);
    
    

  return (

    <div className='min-h-screen flex flex-col  bg-gray-800'>
      <div className='flex flex-grow justify-center items-center w-full'>
        <form action="" method="post">
          <div className='bg-gray-900 w-96 flex flex-col p-5 rounded-2xl border border-gray-700 shadow-xl'>
            
            {/* Header Section */}
            <LogoSticker />

            {/* Form Fields */}
            <div className='flex flex-col mt-8 mb-5 gap-4 justify-end'>
              <p className='font-semibold text-cyan-500'>Paste Invitation ROOM ID</p>
              <input className='bg-gray-50 font-medium text-lg rounded-lg p-2 h-12 focus:ring-2 focus:ring-cyan-500 focus:outline-none' type="text" placeholder='ROOM ID' onChange={(e) => setRoomId(e.target.value)} value={roomId} onKeyUp={handleInputOnPressingEnter} />
              <input className='bg-gray-50 font-medium text-lg rounded-lg p-2 h-12 focus:ring-2 focus:ring-cyan-500 focus:outline-none' type="text" placeholder='USERNAME' onChange={(e) => setUserName(e.target.value)} value={userName} onKeyUp={handleInputOnPressingEnter} />
              
              <button type="submit" onClick={(e) => joinRoom(e)} className="w-40 h-12 ml-auto font-bold bg-orange-300 rounded-lg cursor-pointer shadow-md hover:bg-orange-500 hover:shadow-lg active:scale-95 transition duration-300">Join</button>
            </div>

            <div className='flex justify-center items-center'>
              <p className='text-gray-400 text-xs mr-1'>Don't have invitation id?</p>
              <p><span className='text-green-600 underline cursor-pointer font-semibold text-sm hover:text-green-800 transition duration-300' onClick={createNewRoom}>create new room</span></p>
            </div>
          </div>
        </form>
      </div>

      <footer className="mt-auto text-center py-4 text-gray-400 text-sm">
        <h4>Built with 💛 by @<a href="https://www.linkedin.com/in/kisalay-komal-16125922b/" target='_blank' className="text-green-600 hover:underline hover:text-green-800 transition duration-300">Kisalay Komal</a> &copy;{new Date().getFullYear()}</h4>
      </footer>
    </div>
  )
}

export default Home