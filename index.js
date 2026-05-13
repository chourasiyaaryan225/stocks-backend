import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import { connection } from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import stocksRoutes from './routes/stocksRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {startAlertChecker} from './services/alertChecker.js';
dotenv.config();
connection();
app.use(cors());
startAlertChecker();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/stocks",stocksRoutes);
app.use("/api/user",userRoutes);
app.get('/api',(req,res)=>{
    res.status(200).json({message:"'Welcome to StockAlert api's"})
})
app.listen(4000,()=>console.log('server is listening on port 4000'));
