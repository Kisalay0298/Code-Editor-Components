import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../context/authStore'
import { formatDate } from '../utils/Date'

const UserDashboardPage = () => {
    const { user, logout } = useAuthStore()

    const handleLogout = () => {
        logout();
    }
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.9}}
        className='max-w-md w-full mx-auto mt-10 p-8 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>Dashboard</h2>

        <div className="space-y-6">
            <motion.div
                className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
                <p className='text-gray-300'>Username: {user.name}</p>
                <p className='text-gray-300'>Email: {user.email}</p>
            </motion.div>

            {/* more informations */}
            <motion.div
                className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
                <p className='text-gray-300'>
                    <span className='font-bold'>Joined: </span>
                    {new Date(user.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <p className='text-gray-300'>
                    <span className='font-bold'>Last Login: </span>

                    {user.lastLogin ? formatDate(user.lastLogin) : "You just signed up!"}
                </p>
            </motion.div>
        </div>

        {/* logout */}
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='mt-4'
        >
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="mt-5 w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:from-green-600 hover:via-emerald-700 hover:to-green-800 focus:outline-none focus:ring-0 active:outline-none"
            >
                Logout
            </motion.button>
        </motion.div>
    </motion.div>
  )
}

export default UserDashboardPage