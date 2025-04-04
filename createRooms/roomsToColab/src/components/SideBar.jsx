import React, { useEffect, useState } from "react";
import Client from "../components/Client";
import LogoSticker from './LogoSticker'
import {toast} from 'react-hot-toast'
import socket from '../utils/socket'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserId } from '../utils/getUserId'

const SideBar = () => {
    const [clients, setClients] = useState([]);
    const [adminId, setAdminId] = useState(null); 

    const location = useLocation();
    const navigate = useNavigate();
    const { roomId } = useParams(); // roomId from URL
    const userName = location.state?.userName;
    const userId = getUserId()

    useEffect(() => {
        if (!userName) {
            toast.error("Invalid room or missing user.");
            navigate('/');
            return;
        }

        socket.emit('join', { roomId, userName, userId });

        socket.on('userJoined', ({ clients, adminId }) => {
            setClients(clients);
            setAdminId(adminId); // ✅ receives adminId from server
        });

        socket.on('joined-successfully', ({ roomId, userName }) => {
            toast.success(`${userName} joined`);
        });

        socket.on('room-not-found', () => {
            toast.error("Room not found. Redirecting...");
            navigate('/');
        });

        return () => {
            socket.off('userJoined');
            socket.off('joined-successfully');
            socket.off('room-not-found');
        };
    }, [roomId, userId, userName, navigate]);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        toast.success('Room ID copied');
    }
    
    const leaveRoom = () => {
        socket.emit('leave', { roomId, userName, userId });
        navigate('/');
        setTimeout(() => window.location.reload(), 100);
        // window.location.reload();
    }

  return (
    <div className="border-r w-72 h-screen flex flex-col items-center justify-between py-4">
    {/* Logo and Header */}
    <div className="w-full flex flex-col items-center">
        <div className="w-80 transform scale-75 -mt-4">
        <LogoSticker />
        <div className="h-0.5 border-gray-500 border-b -mt-6 w-5/6 mx-auto"></div>
        </div>

        {/* Connected Users Section */}
        <div className="w-full px-6">
        <h3 className="text-gray-300 font-semibold text-lg ml-3 pb-1">
            Connected
        </h3>
        <div className="flex-1 text-gray-400 text-sm space-y-2 h-125 overflow-y-auto scrollbar-hide shadow-lg rounded-lg">
            {clients.map((client) => (
            <Client
                key={client.socketID}
                socketID={client.socketID}
                userName={`${client.userName}${client.userId === adminId ? ' (admin)' : ''}${client.userId === userId ? ' (you)' : ''}`}
            />
            ))}
        </div>
        </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col mb-5 gap-4 w-3/4">
        <button onClick={copyRoomId} className="w-full h-12 font-bold bg-gray-50 rounded-lg cursor-pointer shadow-md hover:bg-gray-300 hover:shadow-lg active:scale-95 transition duration-300">
        Copy ROOM ID
        </button>
        <button onClick={leaveRoom} className="w-full h-12 font-bold bg-orange-300 rounded-lg cursor-pointer shadow-md hover:bg-orange-500 hover:shadow-lg active:scale-95 transition duration-300">
        Leave
        </button>
    </div>
    </div>
  )
}

export default SideBar