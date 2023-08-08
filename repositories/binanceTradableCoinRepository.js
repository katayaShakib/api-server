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

  static getAllTradableCoins() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT symbol FROM binance_tradable_coins`, [], (error, rows) => {
        if (error) {
          console.error(
            "Error fetching Binance tradable coins from the database:",
            error
          );
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /* static async getAllTradableCoins() {
    try {
      const query = `
      SELECT symbol FROM binance_tradable_coins
      `;
      const allTradableCoins = await db.all(query);
      return allTradableCoins;
    } catch (error) {
      console.error(
        "Error fetching Binance tradable coins from the database:",
        error
      );
      throw new Error("Failed to fetch Binance tradable coins.");
    }
  } */

  static getListWithAveragePrices() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT symbol, averagePrice FROM binance_tradable_coins`,
        [],
        (error, rows) => {
          if (error) {
            console.error(
              "Error fetching Binance tradable coins with average from the database:",
              error
            );
            reject(error);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  /* static async getListWithAveragePrices() {
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
  } */

  static async deleteAll() {
    try {
      const query = "DELETE FROM binance_tradable_coins";
      await db.run(query);
    } catch (error) {
      console.error("Error deleting all Binance tradable coins:", error);
      throw new Error("Failed to delete all Binance tradable coins.");
    }
  }
}

module.exports = BinanceTradableCoinRepository;
