// src/services/ccxtService.js

const ccxt = require("ccxt");

// Instantiate the Binance exchange object
const binanceExchange = new ccxt.binance();

// Get the list of tradable coins on Binance
async function getTradableCoins() {
  try {
    const markets = await binanceExchange.loadMarkets();
    const tradableCoins = Object.keys(markets);

    return tradableCoins;
  } catch (error) {
    console.error("Error fetching tradable coins:", error);
    throw new Error("Failed to fetch tradable coins.");
  }
}

// Get the average price of 100 recent transactions for a specific coin
async function getAveragePrice(coinSymbol) {
  try {
    const ohlcvData = await binanceExchange.fetchOHLCV(
      `${coinSymbol}/USDT`,
      "1m",
      undefined,
      100
    );
    const averagePrice =
      ohlcvData.reduce((total, [, close]) => total + close, 0) /
      ohlcvData.length;

    return averagePrice;
  } catch (error) {
    console.error("Error fetching average price:", error);
    throw new Error("Failed to fetch average price.");
  }
}

module.exports = {
  getTradableCoins,
  getAveragePrice,
};
