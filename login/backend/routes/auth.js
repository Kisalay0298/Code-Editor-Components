import express from "express"
import { login, logout, signup, verifyEmail } from "../controllers/auth.js"


const router = express.Router()
router.post('/signup', signup)
router.get('/login', login)
router.get('/logout', logout)

router.get('/verify-email', verifyEmail)



export default router