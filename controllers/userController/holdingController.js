import Holding from "../../models/holdingModel.js";
import interceptor from "../../services/interceptor.js";
import logger from "../../services/logger.js";

export const addHolding = async (req, res) => {
  try {
    const {user,symbol,companyName,companyLogo,exchange,currency,quantity,buyPrice} = req.body;
    if (
      !user?.trim() ||
      !symbol?.trim() ||
      !companyName?.trim() ||
      !quantity?.toString()?.trim() ||
      !buyPrice?.toString()?.trim()
    ) {
      return res.status(400).json({status: "error",message: "All required fields are mandatory."});
    }
    const existingHolding = await Holding.findOne({
      user,
      symbol,
    });
    if (existingHolding)
      return res.status(409).json({status: "error",message: "Holding already exists."});
    
    await Holding.create({
      user,
      symbol,
      companyName,
      companyLogo,
      exchange,
      currency,
      quantity,
      buyPrice,
    });
    return res.status(201).json({status: "success",message: "Holding added successfully."});
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}`);
    return res.status(500).json({status: "error",message: "Failed to add holding."});
  }
};

export const getUserPortfolio = async (req, res) => {
  try {
    const { user } = req.params;
    if (!user?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "User email is required.",
      });
    }
    const holdings = await Holding.find({ user }).select("-__v");

    const portfolio = await Promise.all(
      holdings.map(async (holding) => {
        try {
          const response = await interceptor.get("/quote", {
            params: {
              symbol: holding.symbol,
            },
          });
          const currentPrice = response.data.c;
          const investedValue = holding.quantity * holding.buyPrice;
          const currentValue = holding.quantity * currentPrice;
          const profitLoss = currentValue - investedValue;
          return {
            ...holding.toObject(),
            currentPrice,
            investedValue,
            currentValue,
            profitLoss,
          };

        } catch (error) {
          logger.error(`Failed to fetch quote for ${holding.symbol}`);
          return {
            ...holding.toObject(),
            currentPrice: null,
            investedValue: null,
            currentValue: null,
            profitLoss: null,
          };

        }
      })
    );
    const totalInvestment = portfolio.reduce(
      (acc, stock) => acc + (stock.investedValue || 0),
      0
    );
    const totalCurrentValue = portfolio.reduce(
      (acc, stock) => acc + (stock.currentValue || 0),
      0
    );
    const totalProfitLoss = totalCurrentValue - totalInvestment;
    return res.status(200).json({
      status: "success",
      message: "Portfolio retrieved successfully.",
      data: {
        holdings: portfolio,
        summary: {
          totalInvestment,
          totalCurrentValue,
          totalProfitLoss,
        },
      },
    });
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve portfolio.",
    });
  }
};