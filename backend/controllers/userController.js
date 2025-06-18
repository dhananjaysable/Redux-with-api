import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details!"
            })
        }
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists!"
            })
        }
        const hash = await bcrypt.hash(password, bcrypt.genSalt(10));
        if (!hash) {
            return res.status(400).json({
                success: false,
                message: "Failed to register!"
            })
        }
        const newUser = new User({
            name,
            email,
            password: hash
        })
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: `User registered successfully.`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in register : ${error.message}`
        })
    }
}