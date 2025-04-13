import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js'


export const checkAuth = async (req, res) => {
    try {

        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ success: true, user })
        
    } catch (error) {
        console.log('Error in checkAuth ', error)
        res.status(400).json({ success: true, message: error.message })
    }
}


export const signup = async (req, res)=> {
    const {name, email, password} = req.body;
    try{
        if (!email || !password || !name) {
            throw new Error('All fields are required')
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({success: false, message: 'Email already in use'})
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
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success: false, message: 'Invalid credentials'})
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({success: false, message: 'Invalid password'})
        }
        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(401).json({success: false, message: 'Email not verified'})
        }
        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({success: true, message: 'Logged in successfully', user: {...user._doc, password: undefined}})
    }catch(err){
        console.log("Error in login", err);
        return res.status(400).json({success: false, message: err.message})
    }
}

export const logout = async (req, res)=> {
    res.clearCookie('token')
    res.json({success: true, message: 'Logged out successfully'})
}

export const verifyEmail = async (req, res)=> {
    const {code} = req.body;
    console.log('triggered')
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })
        // console.log(req.body)
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid or expired verification code'})
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()
        await sendWelcomeEmail(user.email, user.name)
        generateTokenAndSetCookie(res, user._id)
        res.json({success: true, message: 'Email verified successfully :)'})
    } catch (error) {
        console.log("Some error occured: ", error)
        res.status(400).json({success: false, message: 'Error verifying email'})
    }
}

export const forgotPassword = async (req, res)=>{
    const {email} = req.body
    try {

        const user = await  User.findOne({ email })

        if(!user){
            return res.status(400).json({success: false, message: 'User not found'})
        }

        // generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000;

        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({success: true, message: 'Password reset link sent to your email'})
        
    } catch (error) {
        console.log('Error in forgotPassword: ', error)
        res.status(400).json({success: false, message: error.message})
    }
}

export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() }
        })

        if(!user){
            return res.status(400).json({success: false, message: 'Invalid or expired password reset token'})
        }

        // update Password
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);
        res.status(200).json({success: true, message: 'Password reset successfully'})
        
    } catch (error) {
        console.log('Error in reset password ', error)
        res.status(400).json({success: false, message: error.message})
    }
}