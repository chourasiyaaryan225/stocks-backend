import express from 'express';
import { searchStocks,getStockDetails ,getStocks} from '../controllers/stocksController/stocks.js';
import { get } from 'mongoose';
const router = express.Router();
router.get('/search',searchStocks);
router.get('/getStocksDetails/:symbol',getStockDetails);
router.get('/getStocks',getStocks);
export default router;