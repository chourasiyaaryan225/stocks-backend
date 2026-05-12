import express from "express";
import { signup } from "../controllers/authController/signup.js";
import { login } from "../controllers/authController/login.js";
const router = express.Router();
router.post('/signup',signup);
router.post('/login',login);
export default router;