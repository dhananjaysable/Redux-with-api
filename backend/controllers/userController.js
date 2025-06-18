import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/userModel.js';

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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Credentials required!"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            maxAge: 1 * 24 * 60 * 60 * 1000,
            sameSite: "lax"
        }
        return res.cookie('access_token', token, cookieOptions).status(200).json({
            success: true,
            message: `Welcome ${user.name.split(" ")[0]}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in login : ${error.message}`
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.cookie('access_token', '', {
            maxAge: 0
        }).status(200).json({
            success: true,
            message: "Logged out successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error in logout : ${error.message}`
        })
    }
}