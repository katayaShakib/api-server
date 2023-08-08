const express = require("express");
const ccxtService = require("../services/ccxtService");

const router = express.Router();

// Route to get the list of tradable coins on Binance
router.get("/tradableCoins", async (req, res) => {
  try {
    const tradableCoins = await ccxtService.getTradableCoins();
    res.json(tradableCoins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get the average price of a specific coin
router.get("/tradableCoins/averagePrices", async (req, res) => {
  const { coinSymbol } = req.params;
  try {
    const averagePrice = await ccxtService.getAveragePrice(coinSymbol);
    res.json({ coinSymbol, averagePrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
