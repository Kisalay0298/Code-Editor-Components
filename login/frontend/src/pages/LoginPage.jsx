import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Input } from '../components/Input'
import { Mail, LockIcon, Loader } from 'lucide-react'

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
    }

  return (
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Welcome Back</h2>

            <form onSubmit={handleLogin}>
                <Input 
                    icon={Mail}
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    icon={LockIcon}
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className='flex items-center mb-6'>
                    <Link to='/forgot-password' className='text-sm text-green-400 hover:text-green-600 hover:underline'>Forgot password</Link>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    // disabled={isLoading}
                    className="w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:from-green-600 hover:via-emerald-700 hover:to-green-800 focus:outline-none focus:ring-0 active:outline-none">
                    <span className="tracking-wide text-lg">Login</span>
                </motion.button>
            </form>
        </div>

        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Don't have an account?{" "}
                <Link to={'/signup'} className='text-green-400 hover:text-green-600 hover:underline'>Sign up</Link>
            </p>
        </div>
        
    </motion.div>
  )
}

export default LoginPage