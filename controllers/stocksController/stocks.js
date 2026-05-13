import interceptor from "../../services/interceptor.js";
import logger from "../../services/logger.js";
import { getCompanyDetails } from "../../utils/companyDetails.js"
export const searchStocks = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query)
      return res.status(400).json({status: "error",message: "Search query is required"});

    const response = await interceptor.get("/search", {
      params: {
        q: query,
      },
    });

    const filteredStocks = response.data?.result
      ?.slice(0, 10)
      ?.map((stock) => ({
        symbol: stock.symbol,
        name: stock.description,
      }));
    const stocksWithDetails = await Promise.all(
      filteredStocks?.map(async (stock)=>{
        try {
          const details = await getCompanyDetails(stock.symbol);
          return {
            ...stock,
            details
          }
        }catch(error){
          logger.error(`Failed to fetch company details for ${stock.symbol}:`, error);
          return;
        }
      })
    )
    return res.status(200).json({status: "success",message:"Search successfully.",data: stocksWithDetails || []});
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to search stocks"});
  }
};
export const getStockDetails = async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const quoteResponse = await interceptor.get("/quote", {
          params: {
            symbol,
          },
      });
    const quote = quoteResponse.data;
    const stockDetails = {
      symbol,
      currentPrice: quote.c,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      previousClose: quote.pc,
      percentageChange:quote.pc !== 0 ? (((quote.c - quote.pc) / quote.pc) *100).toFixed(2): 0,
    };
    return res.status(200).json({status:"success",data: stockDetails});
  }catch(error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error.message}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to fetch stock details"});
  }
};
export const getStocks = async (req, res) => {
  try {
    const response = await interceptor.get("/stock/symbol", {
      params: {
        exchange: "US",
      },
    });
    const filteredStocks = response.data
      ?.slice(0, 20)
      ?.map((stock) => ({
        currency: stock.currency,
        symbol: stock.symbol,
        name: stock.description,
      }));
    const stocksWithDetails = await Promise.all(
      filteredStocks.map(async (stock)=>{
        try {
          const details = await getCompanyDetails(stock.symbol);
          return {
            ...stock,
            details
          }
        }catch(error){
          logger.error(`Failed to fetch company details for ${stock.symbol}:`, error);
          return;
        }
      })
    )
    const resultStocks = stocksWithDetails.filter(stock=>stock?.details?.logo !== undefined);
    return res.status(200).json({status: "success",message:"Stocks retrieved successfully.",data: resultStocks || []});
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to retrieve stocks"});
  }
};