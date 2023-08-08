const db = require("../database");

class BinanceTradableCoinRepository {
  static async save(binanceTradableCoin) {
    try {
      const query = `
        INSERT INTO binance_tradable_coins (symbol, averagePrice)
        VALUES (?, ?)
      `;

      await db.run(query, [
        binanceTradableCoin.symbol,
        binanceTradableCoin.averagePrice,
      ]);
    } catch (error) {
      console.error(
        "Error saving Binance tradable coin to the database:",
        error
      );
    }
  }

  static async getAllTradableCoins() {
    try {
      const query = `
      SELECT symbol FROM binance_tradable_coins
      `;
      const allTradableCoins = await db.all(query);
      console.log('Fetched tradable coins from the database:', allTradableCoins);
      return allTradableCoins;
    } catch (error) {
      console.error(
        "Error fetching Binance tradable coins from the database:",
        error
      );
      throw new Error("Failed to fetch Binance tradable coins.");
    }
  }

  static async getListWithAveragePrices() {
    try {
      const query = `
      SELECT symbol, averagePrice 
      FROM binance_tradable_coins
      `;

      return await db.all(query);
    } catch (error) {
      console.error(
        "Error fetching Binance tradable coins from the database:",
        error
      );
      throw new Error("Failed to fetch Binance tradable coins.");
    }
  }

  static async deleteAll() {
    try {
      const query = `DELETE FROM binance_tradable_coins`;
      await db.run(query);
    } catch (error) {
      console.error("Error deleting all Binance tradable coins:", error);
      throw new Error("Failed to delete all Binance tradable coins.");
    }
  }
}

module.exports = BinanceTradableCoinRepository;
