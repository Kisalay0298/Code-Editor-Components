import express from 'express'
const app = express()
import 'dotenv/config';
import cors from 'cors'
import { connect } from './db/connectDB.js'
import { removeUnvarifiedAccount } from './automation/removeUnverifiedAccount.js'


import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';

app.use(cors({ origin: 'http://localhost:5173', credentials: true}))
app.use(express.json()) // to parse incomming request
app.use(cookieParser()) //allows to parse incoming cookies




app.use('/api/auth', authRoutes)



removeUnvarifiedAccount()
const port = process.env.PORT
app.listen (port, () => {
    connect()
    console.log(`Server is running on port http://localhost:${port}`)
})

