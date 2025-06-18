import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { dbConnection } from './config/db.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

dbConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})