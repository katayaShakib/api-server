const db = require("../database");

class EthereumTransactionRepository {
  static async save(ethereumTransaction) {
    try {
      const query = `
        INSERT INTO ethereum_transactions (transactionHash, senderAddress, receiverAddress, amountTransferred, blockNumber)
        VALUES (?, ?, ?, ?, ?)
      `;

      await db.run(query, [
        ethereumTransaction.transactionHash,
        ethereumTransaction.senderAddress,
        ethereumTransaction.receiverAddress,
        ethereumTransaction.amountTransferred,
        ethereumTransaction.blockNumber,
      ]);
    } catch (error) {
      console.error(
        "Error saving Ethereum transaction to the database:",
        error
      );
    }
  }

  static getLatestTransactions() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT transactionHash, senderAddress, receiverAddress, amountTransferred, blockNumber
        FROM ethereum_transactions
        ORDER BY amountTransferred DESC
        LIMIT 1000`,
        [],
        (error, rows) => {
          if (error) {
            console.error(
              "Error fetching Ethereum transactions from the database:",
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

  /* static async getLatestTransactions() {
    try {
      const query = `
        SELECT transactionHash, senderAddress, receiverAddress, amountTransferred, blockNumber
        FROM ethereum_transactions
        ORDER BY amountTransferred DESC
        LIMIT 1000
      `;

      return await db.all(query);
    } catch (error) {
      console.error(
        "Error fetching Ethereum transactions from the database:",
        error
      );
      throw new Error("Failed to fetch Ethereum transactions.");
    }
  } */

  static async deleteAll() {
    try {
      const query = "DELETE FROM ethereum_transactions";
      await db.run(query);
    } catch (error) {
      console.error("Error deleting all Ethereum transactions:", error);
      throw new Error("Failed to delete all Ethereum transactions.");
    }
  }
}

module.exports = EthereumTransactionRepository;
