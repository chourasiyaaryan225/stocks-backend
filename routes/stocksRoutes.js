import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { searchStocks,getStockDetails ,getStocks} from '../controllers/stocksController/stocks.js';
const router = express.Router();
router.get('/search',authMiddleware,searchStocks);
router.get('/getStocksDetails/:symbol',authMiddleware,getStockDetails);
router.get('/getStocks',authMiddleware,getStocks);
export default router;