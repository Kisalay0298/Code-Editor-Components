import express from 'express'
const app = express()
import { connect } from './db/connectDB.js'
import 'dotenv/config';
import authRoutes from './routes/auth.js'


app.use(express.json()) // to parse incomming request


app.use('/api/auth', authRoutes)

const port = process.env.PORT
app.listen (port, () => {
    connect()
    console.log(`Server is running on port http://localhost:${port}`)
})

