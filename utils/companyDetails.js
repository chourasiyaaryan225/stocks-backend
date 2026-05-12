import interceptor from "../services/interceptor.js";
import logger from "../services/logger.js";
export const getCompanyDetails = async (symbol)=>{
    try{
        const response = await interceptor.get("/stock/profile2", {
            params: {
                symbol,
            },
        });
        return response.data;
    }catch(error) {
        logger.error(`Failed to fetch company details for ${symbol}:`, error);
        throw new Error("Failed to fetch company details");
    }
}