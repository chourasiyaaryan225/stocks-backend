import User from '../../models/userModel.js';
import bcrypt from 'bcrypt';
import { getToken } from '../../services/jwt.js';
import logger from '../../services/logger.js';
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ status:"error",message: "Email and password required." })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ status:"error",message: "User not found." })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({status:"error", message: "Invalid credentials." })
        }
        const token = getToken({id:user?.email})
        if(!token)
            return res.status(400).json({status:"error",message:"Something went wrong."})
        return res.status(200).json({
            status:"success",
            message: "Login successfully.",
            token,
            user: {
                id: user.email,
                name: user.name
            }
        })
    } catch (error) {
        logger.error(`URL: ${req.originalUrl} - ERROR: ${error.message}` || "Internal Server Error.");
        res.status(500).json({ message: "Server error", error: error.message })
    }
}