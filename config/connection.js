import mongoose from "mongoose";
import logger from "../services/logger.js";
export const connection = async ()=>{
    try{
        const url= process.env.MONGO_URL;
        logger.info(`Connecting to MongoDB at : ${url}`);
        await mongoose.connect(url)
        logger.info("MongoDB connected successfully");
    }catch(error){
        logger.error(`mongo db connection failed:${error}`);
    };
}