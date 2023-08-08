const ccxt = require("ccxt");
const BinanceTradableCoin = require("../entities/BinanceTradableCoin");
const BinanceTradableCoinRepository = require("../repositories/binanceTradableCoinRepository");

// Get the list of tradable coins on Binance
async function getTradableCoins() {
  try {
    // Delete all existing Binance tradable coins from the database
    try {
      await BinanceTradableCoinRepository.deleteAll();
    } catch (error) {
      console.error("Error deleting existing Binance tradable coins:", error);
    }

    // Fetch the list of tradable coins from CCXT
    const exchange = new ccxt.binance();
    const markets = await exchange.fetchMarkets();
    let counter = 0;
    // Save Binance tradable coins and their average prices to the database using the repository
    for (const market of markets) {
      if (counter > 99) {
        break;
      }
      const symbol = market.symbol;
      const trades = await exchange.fetchTrades(symbol, undefined, 100); // Fetch the last 100 trades

      if (trades.length === 0) continue; // Skip coins with no recent trades

      // Calculate the average price based on the last 100 trades
      const totalPrice = trades.reduce((sum, trade) => sum + trade.price, 0);
      const averagePrice = totalPrice / trades.length;

      const binanceTradableCoin = new BinanceTradableCoin(symbol, averagePrice);

      try {
        await BinanceTradableCoinRepository.save(binanceTradableCoin);
      } catch (error) {
        console.error(
          "Error saving Binance tradable coin to the database:",
          error
        );
      }

      counter++;
    }

    // Get all tradable coins from the database using the repository
    const allTradableCoins =
      await BinanceTradableCoinRepository.getAllTradableCoins();
    return allTradableCoins;
  } catch (error) {
    console.error("Error fetching tradable coins:", error);
    throw new Error("Failed to fetch tradable coins.");
  }
}

// Get the average price of 100 recent transactions for a specific coin
async function getAveragePrice() {
  try {
    // Get all tradable coins from the database using the repository
    const listWithAveragePrices =
      await BinanceTradableCoinRepository.getListWithAveragePrices();

    return listWithAveragePrices;
  } catch (error) {
    console.error("Error fetching average price:", error);
    throw new Error("Failed to fetch average price.");
  }
}

module.exports = {
  getTradableCoins,
  getAveragePrice,
};
