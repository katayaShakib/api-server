require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");
const EthereumTransaction = require("../entities/EthereumTransaction");
const EthereumTransactionRepository = require("../repositories/ethereumTransactionRepository");

// Check if the provided wallet address is valid
function isValidWalletAddress(address) {
  try {
    return ethers.isAddress(address);
  } catch (error) {
    console.error("Error checking wallet address:", error);
    return false;
  }
}

// Create a new wallet
function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

// Get the latest 1000 Ethereum transactions with specified data
async function getLatestTransactions() {
  try {
    // Delete all existing Ethereum transactions from the database
    try {
      await EthereumTransactionRepository.deleteAll();
    } catch (error) {
      console.error("Error deleting existing Ethereum transactions:", error);
    }

    const url = process.env.PROVIDER_URL;
    const provider = new ethers.JsonRpcProvider(url);
    const blockNumber = await provider.getBlockNumber();
    const batchSize = 200;
    const startBlock = blockNumber - batchSize + 1;
    const endBlock = blockNumber;

    const transactions = [];

    for (let i = startBlock; i <= endBlock; i++) {
      const block = await provider.getBlock(i);
      if (block && block.transactions.length > 0) {
        for (const txHash of block.transactions) {
          const transaction = await provider.getTransaction(txHash);
          if (transaction && transaction.value) {
            const senderAddress = transaction.from;
            const receiverAddress = transaction.to;
            const amountTransferred = ethers.formatEther(transaction.value);
            const blockNumber = transaction.blockNumber;

            transactions.push({
              transactionHash: txHash,
              senderAddress,
              receiverAddress,
              amountTransferred,
              blockNumber,
            });
          }
        }
      }
    }

    // Sort transactions by etherium quantity (descending order)
    transactions.sort((a, b) => b.amountTransferred - a.amountTransferred);

    // Save Ethereum transactions to the database using the repository
    for (const transactionData of transactions) {
      const ethereumTransaction = new EthereumTransaction(
        transactionData.transactionHash,
        transactionData.senderAddress,
        transactionData.receiverAddress,
        transactionData.amountTransferred,
        transactionData.blockNumber
      );

      try {
        await EthereumTransactionRepository.save(ethereumTransaction);
      } catch (error) {
        console.error(
          "Error saving Ethereum transaction to the database:",
          error
        );
        throw new Error(
          "Failed to save Ethereum transactions to the database."
        );
      }
    }

    // Get the latest 1000 Ethereum transactions from the database using the repository
    const latestTransactions =
      await EthereumTransactionRepository.getLatestTransactions();

    return latestTransactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch Ethereum transactions.");
  }
}

module.exports = {
  isValidWalletAddress,
  createWallet,
  getLatestTransactions,
};
