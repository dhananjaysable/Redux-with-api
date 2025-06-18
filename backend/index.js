import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { dbConnection } from './config/db.js'
import { userRouter } from './routes/userRoute.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//api
app.use('/api/auth', userRouter);


dbConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})