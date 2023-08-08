/**
 * @swagger
 * tags:
 *   name: CCXT
 *   description: CCXT API
 */

const express = require("express");
const ccxtService = require("../services/ccxtService");

const router = express.Router();

/**
 * @swagger
 * /ccxt/tradableCoins:
 *   get:
 *     summary: Get the list of tradable coins on Binance
 *     tags: [CCXT]
 *     responses:
 *       200:
 *         description: Array of tradable coin objects containing the coins' symbol
 *         content:
 *           application/json:
 *             example:
 *               - symbol:BTC
 *               - symbol:ETH
 *       500:
 *         description: Error occurred while fetching tradable coins
 */
router.get("/tradableCoins", async (req, res) => {
  const tradableCoins = await ccxtService.getTradableCoins();
  res.json(tradableCoins);
});

/**
 * @swagger
 * /ccxt/tradableCoins/averagePrices:
 *   get:
 *     summary: Get the list of tradable coins on Binance with their average prices
 *     tags: [CCXT]
 *     responses:
 *       200:
 *         description: Array of tradable coin objects containing the coins' symbol and average price
 *         content:
 *           application/json:
 *             example:
 *               - symbol:BTC/USDT averagePrice:40000.0
 *               - symbol:ETH/USDT averagePrice:2000.0
 *       500:
 *         description: Error occurred while fetching the average price
 */
router.get("/tradableCoins/averagePrices", async (req, res) => {
  const averagePrice = await ccxtService.getAveragePrice();
  res.json(averagePrice);
});

module.exports = router;
