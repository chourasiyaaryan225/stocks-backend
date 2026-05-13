import Watchlist from "../../models/watchlistModel.js";
import logger from "../../services/logger.js";
export const addToWatchlist = async (req, res) => {
  try {
    const {user,symbol,companyName,companyLogo,exchange,country,currency} = req.body;

    if (!user?.trim() || !symbol?.trim() || !companyName?.trim() || !exchange?.trim() || !country?.trim() || !currency?.trim()) {
      return res.status(400).json({status: "error",message: "All required fields are mandatory."});
    }
    const existingStock = await Watchlist.findOne({
      user,
      symbol,
    });
    if (existingStock) 
        return res.status(409).json({status: "error",message: "Stock already exists in watchlist."});
    
    const watchlistStock = await Watchlist.create({
      user,
      symbol,
      companyName,
      companyLogo,
      exchange,
      country,
      currency,
    });

    return res.status(201).json({
      status: "success",
      message: "Stock added to watchlist successfully.",
      data: watchlistStock,
    });
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to add stock to watchlist."});
  }
};
export const removeFromWatchlist = async (req, res) => {
  try {
    const { user, symbol } = req.body;
    if (!user?.trim() || !symbol?.trim()) 
      return res.status(400).json({status: "error",message: "User and symbol are required."});
    const deletedStock = await Watchlist.findOneAndDelete({
      user,
      symbol,
    });

    if (!deletedStock) 
      return res.status(404).json({status: "error",message: "Stock not found in watchlist."});
    return res.status(200).json({status: "success",message: "Stock removed from watchlist successfully."});
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to remove stock from watchlist."});
  }
};
export const getUserWatchlist = async (req, res) => {
  try {
    const { user } = req.params;
    if (!user?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "User email is required.",
      });
    }
    const watchlist = await Watchlist.find({ user }).select("-__v -createdAt -user -_id").lean();
    return res.status(200).json({
      status: "success",
      message: "Watchlist retrieved successfully.",
      data: watchlist || [],
    });
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to retrieve watchlist."});
  }
};