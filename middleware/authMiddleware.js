import { verifyToken } from "../services/jwt.js";
import logger from "../services/logger.js";
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: "error", message: "Unauthorized access." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: "error", message: "Token not found." });
    }
    const decoded = await verifyToken(token);
    if(!decoded)
        return res.status(401).json({ status: "error", message: "Invalid token or expired token." });
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`URL: ${req.originalUrl} - ERROR: ${error}`);
    return res.status(401).json({ status: "error", message: "Invalid or expired token." });
  }
};
export default authMiddleware;