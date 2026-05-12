import cron from "node-cron";
import Alert from "../models/alertModel.js";
import interceptor from "./interceptor.js";
import logger from "./logger.js";
export const startAlertChecker = () => {
  cron.schedule("* * * * *", async () => {
    try {
      logger.info("Checking alerts...");
      const activeAlerts = await Alert.find({
        isTriggered: false,
      });
      logger.info(`Found ${activeAlerts.length} active alerts`);
      const groupedAlerts = {};
      activeAlerts.forEach((alert) => {
        if (!groupedAlerts[alert.symbol]) {
          groupedAlerts[alert.symbol] = [];
        }
        groupedAlerts[alert.symbol].push(alert);
      });
      for (const symbol in groupedAlerts) {
        try {
          const response = await interceptor.get("/quote", {
            params: {
              symbol,
            },
          });
          const currentPrice = response.data.c;
          const symbolAlerts = groupedAlerts[symbol];
          for (const alert of symbolAlerts) {
            let shouldTrigger = false;
            if (
              alert.condition === "GREATER_THAN" &&
              currentPrice > alert.targetPrice
            ) {
              shouldTrigger = true;
            }
            if (
              alert.condition === "LESS_THAN" &&
              currentPrice < alert.targetPrice
            ) {
              shouldTrigger = true;
            }

            if (shouldTrigger) {
              await Alert.findByIdAndUpdate(alert._id, {
                isTriggered: true,
                triggeredAt: new Date(),
                triggeredPrice: currentPrice,
              });
            }
          }
        } catch (error) {
          logger.error(
            `Failed to fetch quote for ${symbol}`,
            error.message
          );
        }
      }
    } catch (error) {
      logger.error("Alert checker cron failed:", error.message);
    }
  });
};