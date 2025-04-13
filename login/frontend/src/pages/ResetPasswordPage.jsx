import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useAuthStore } from '../context/authStore'
import { useNavigate, useParams } from 'react-router-dom'
import { LockIcon, Eye, EyeOff } from 'lucide-react'
import { Input } from '../components/Input'
import toast from 'react-hot-toast'

const ResetPasswordPage = () => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {resetPassword, error, isLoading, message} = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      toast.error('Passwords do not match')
      return;
    }

    try {

      await resetPassword(password, token)
      toast.success("Password reset successfully")
      setTimeout(() => navigate('/login'), 1000)
      
    } catch (error) {

      console.log(error)
      toast.error(error.message || 'Error resetting password')
      
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Reset Password</h2>
        
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p> }
        {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

        <form onSubmit={handleSubmit}>
          <Input 
            icon={LockIcon}
            type={showPassword ? 'text' : 'password'}
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            iconRight={
              showPassword ? 
              <Eye className="cursor-pointer text-gray-400 hover:text-white size-5" onClick={() => setShowPassword(false)} /> :
              <EyeOff className="cursor-pointer text-gray-400 hover:text-white size-5" onClick={() => setShowPassword(true)} />
            }
          />

          <Input 
            icon={LockIcon}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            iconRight={
              showConfirmPassword ? 
              <Eye className="cursor-pointer text-gray-400 hover:text-white size-5" onClick={() => setShowConfirmPassword(false)} /> :
              <EyeOff className="cursor-pointer text-gray-400 hover:text-white size-5" onClick={() => setShowConfirmPassword(true)} />
            }
          />

          <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              className="w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:from-green-600 hover:via-emerald-700 hover:to-green-800 focus:outline-none focus:ring-0 active:outline-none">
              <span className="tracking-wide text-lg">{isLoading ? "Resetting..." : "Set New Password"}</span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage