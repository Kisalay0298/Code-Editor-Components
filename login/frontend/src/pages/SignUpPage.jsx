import { motion } from 'framer-motion'
import { User, Mail, LockIcon, Loader } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useAuthStore } from '../context/authStore'

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const { signUp, error, isLoading } = useAuthStore()

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {

            await signUp(email, password, name)
            navigate('/verify-email')
            
        } catch (error) {
            console.log("error", error)
            console.log("isLoading: ", isLoading)
        }
    }

  return (
    <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
            {/* Heading */}
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Create Account</h2>
            {/* Form Body */}
            <form onSubmit={handleSignUp}>
                {/* input */}
                <Input 
                    icon={User}
                    type='text'
                    placeholder='Username'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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

                {/* if there is some error */}
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                {/* password strength meter */}
                <PasswordStrengthMeter password={password} />
                
                <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-5 w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:from-green-600 hover:via-emerald-700 hover:to-green-800 focus:outline-none focus:ring-0 active:outline-none">
                    <span className="tracking-wide text-lg">
                        {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
                    </span>
                </motion.button>

            </form>
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Already have an account?{" "}
                <Link to={'/login'} className='text-green-400 hover:text-green-600 hover:underline'>Login</Link>
            </p>
        </div>
    </motion.div>
  )
}

export default SignUpPage