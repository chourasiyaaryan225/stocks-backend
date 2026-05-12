import Alert from "../../models/alertModel.js";
import logger from "../../services/logger.js";
export const createAlert = async (req, res) => {
  try {

    const {user,symbol,companyName,condition,targetPrice} = req.body;

    if (
      !user?.trim() ||
      !symbol?.trim() ||
      !companyName?.trim() ||
      !condition?.trim() ||
      !targetPrice?.toString()?.trim()
    ) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required.",
      });
    }

    const existingAlert = await Alert.findOne({
      user,
      symbol,
      condition,
      targetPrice,
    });

    if (existingAlert) {
      return res.status(409).json({
        status: "error",
        message: "Alert already exists.",
      });
    }

    const alert = await Alert.create({
      user,
      symbol,
      companyName,
      condition,
      targetPrice,
    });

    return res.status(201).json({status: "success",message: "Alert created successfully."});
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to create alert."});
  }
};
export const getUserAlerts = async (req, res) => {
  try {

    const { user } = req.params;

    if (!user?.trim()) {
      return res.status(400).json({
        status: "error",
        message: "User email is required.",
      });
    }

    const alerts = await Alert.find({
      user,
    }).select("-__v");

    return res.status(200).json({
      status: "success",
      message: "Alerts retrieved successfully.",
      data: alerts || [],
    });

  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to retrieve alerts."});
  }
};
export const deleteAlert = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedAlert = await Alert.findOneAndDelete({
      _id: id
    });
    if (!deletedAlert) {
      return res.status(404).json({
        status: "error",
        message: "Alert not found.",
      });
    }
    return res.status(200).json({status: "success",message: "Alert deleted successfully."});
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}` || "Internal Server Error.");
    return res.status(500).json({status: "error",message: "Failed to delete alert."});
  }
};