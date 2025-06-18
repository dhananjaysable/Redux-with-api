import express from 'express'
import { getAuthUser, login, logout, register } from '../controllers/userController.js'
import { checkAuth } from '../middlewares/authMiddleware.js';

export const userRouter = express.Router()

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/user', checkAuth, getAuthUser)