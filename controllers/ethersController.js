/**
 * @swagger
 * tags:
 *   name: Ethers
 *   description: Ethers API
 */

const express = require("express");
const ethersService = require("../services/ethersService");

const router = express.Router();

/**
 * @swagger
 * /ethers/isValidWalletAddress/{address}:
 *   get:
 *     summary: Check if a wallet address is valid
 *     tags: [Ethers]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: Wallet address to check
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Indicates whether the address is valid or not
 *         content:
 *           application/json:
 *             example:
 *               isValid: true
 *       400:
 *         description: Invalid wallet address format
 */
router.get("/isValidWalletAddress/:address", (req, res) => {
  const { address } = req.params;
  const isValid = ethersService.isValidWalletAddress(address);
  res.json({ isValid });
});

/**
 * @swagger
 * /ethers/createWallet:
 *   get:
 *     summary: Create a new Ethereum wallet
 *     tags: [Ethers]
 *     responses:
 *       200:
 *         description: Newly created wallet object
 *         content:
 *           application/json:
 *             example:
 *               address: 0x...
 *               privateKey: 0x...
 *       500:
 *         description: Error occurred while creating the wallet
 */
router.get("/createWallet", (req, res) => {
  const wallet = ethersService.createWallet();
  res.json(wallet);
});

/**
 * @swagger
 * /ethers/getLatestTransactions:
 *   get:
 *     summary: Get the latest Ethereum transactions
 *     tags: [Ethers]
 *     responses:
 *       200:
 *         description: Array of latest transactions
 *         content:
 *           application/json:
 *             example:
 *               - transactionHash: 0x...
 *                 sender: 0x...
 *                 receiver: 0x...
 *                 amount: 1.2345
 *                 blockNumber: 1234567
 *       500:
 *         description: Error occurred while fetching transactions
 */
router.get("/getLatestTransactions", async (req, res) => {
  const transactions = await ethersService.getLatestTransactions();
  res.json(transactions);
});

module.exports = router;
