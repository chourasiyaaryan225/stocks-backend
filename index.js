import express from 'express';
const app = express();
import dotenv from 'dotenv';
import { connection } from './config/connection.js';
import authRoutes from './routes/authRoutes.js';
import stocksRoutes from './routes/stocksRoutes.js';
dotenv.config();
connection();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/stocks",stocksRoutes);
app.get('/api',(req,res)=>{
    res.status(200).json({message:"'Welcome to StockAlert api's"})
})
app.listen(3000,()=>console.log('server is listening on port 3000'));