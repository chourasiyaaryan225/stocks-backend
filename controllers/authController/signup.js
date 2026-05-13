import User from "../../models/userModel.js"
import bcrypt from "bcrypt"
import { getToken } from "../../services/jwt.js"
import logger from "../../services/logger.js"
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ status:"error",message: "All fields are required." })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({status:"error", message: "Email already registered." })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })        
        const token = getToken({id:user?.email});
        if(!token)
            return res.status(400).json({status:"error",message:"Something went wrong."})
        return res.status(201).json({
            status:"success",
            message: "Account created successfully.",
            token,
            user: {
                name: user.name,
                id: user.email
            }
        })
    } catch (error) {
        logger.error(`URL: ${req.originalUrl} - ERROR: ${error.message}` || "Internal Server Error.");
        return res.status(500).json({status:"error", message: "Internal Server Error.", error: error.message })
    }
}