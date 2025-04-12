import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../context/authStore'
import { toast } from 'react-hot-toast'

const EmailVerificationPage = () => {

    const [code, setCode] = useState(['', '', '','', '', ''])
    const inputRef = useRef([])
    const navigate = useNavigate()

    const { error, isLoading, verifyEmail } = useAuthStore()

    const handleChange = (index, value) => {
        const newCode = [...code]

        // handle pasted content
        if(value.length > 1){
            const pastedCode = value.slice(0,6).split('');
            for(let i=0; i<6; i++){
                newCode[i] = pastedCode[i] || '';
            }
            setCode(newCode)

            // also need to focus on last element input or the first input if it is empty
            const lastFilledIndex = newCode.findLastIndex((digit) => digit!=='')
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRef.current[focusIndex]?.focus()
        }else{
            newCode[index] = value
            setCode(newCode)

            if(value && index < 5){
                inputRef.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRef.current[index -1]?.focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const verificationCode = code.join('')
        try {

            await verifyEmail(verificationCode)
            navigate('/')
            toast.success('Email verified successfully')
            
        } catch (error) {

            console.log(error)
            
        }
    }

    // auto submit when all fields are filled
    useEffect(()=>{
        if(code.every((digit) => digit !== '')){
            handleSubmit(new Event('submit'))
        }
    }, [code])

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
        >
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Verify Your Email</h2>
            <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address</p>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='flex justify-between'>
                    {code.map((digit, index) => (
                        <input 
                            key={index}
                            ref={(elem) => (inputRef.current[index] = elem)}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='w-12 h-12 text-center text-2xl font-semibold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none'
                            onPaste={(e) => {
                                e.preventDefault();
                                const pasted = e.clipboardData.getData('text').slice(0, 6);
                                const pastedCode = pasted.split('');
                                const newCode = [...code];
                                for (let i = 0; i < 6; i++) {
                                    newCode[i] = pastedCode[i] || '';
                                }
                                setCode(newCode);
                                const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
                                const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
                                inputRef.current[focusIndex]?.focus();
                            }}                            
                        />
                    ))}
                </div>

                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isLoading || code.some((digit) => !digit)}
                    className="mt-5 w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:from-green-600 hover:via-emerald-700 hover:to-green-800 focus:outline-none focus:ring-0 active:outline-none">
                    <span className="tracking-wide text-lg">{isLoading ? "Verifying..." : "Verify Email"}</span>
                </motion.button>
            </form>
        </motion.div>
    </div>
  )
}

export default EmailVerificationPage