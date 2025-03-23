import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js'

export const signup = async (req, res)=> {
    const {name, email, password} = req.body;
    try{
        if (!email || !password || !name) {
            throw new Error('All fields are required')
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({success: false, message: 'Email already in use'})
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new User({
            email,
            password: hashPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000, //24hr
        })

        const verificationMailSent =  await sendVerificationEmail(user.email, verificationToken) 
        if (!verificationMailSent) {
            await user.save()
            generateTokenAndSetCookie(res, user._id)
        }

        res.status(201).json({success: true, message: "User created", user: {...user._doc, password: undefined}})

    }catch(err){
        return res.status(400).json({success: false, message: err.message})
    }
}

export const login = async (req, res)=> {
    res.send('login route')
}

export const logout = async (req, res)=> {
    res.send('logout route')
}

export const verifyEmail = async (req, res)=> {
    const {verificationCode} = req.body
    try {
        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        // console.log(req.body)
        if(!user){
            return res.json({success: false, message: 'Invalid or expired verification code'})
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        await generateTokenAndSetCookie(res, user._id)
        res.json({success: true, message: 'Email verified successfully :)'})
    } catch (error) {
        console.log("Some error occured: ", error)
        res.json({success: false, message: 'Error verifying email'})
    }
}