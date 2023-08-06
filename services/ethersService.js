require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");

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
    const url = process.env.PROVIDER_URL;
    const provider = new ethers.JsonRpcProvider(url);
    const blockNumber = await provider.getBlockNumber();
    const batchSize = 1; //1000 needs a paid pro provider subscription
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

    return transactions;
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
