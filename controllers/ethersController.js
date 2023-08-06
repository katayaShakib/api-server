const express = require("express");
const ethersService = require("../services/ethersService");

const router = express.Router();

router.get("/isValidWalletAddress/:address", (req, res) => {
  const { address } = req.params;
  const isValid = ethersService.isValidWalletAddress(address);
  res.json({ isValid });
});

router.get("/createWallet", (req, res) => {
  const wallet = ethersService.createWallet();
  res.json(wallet);
});

router.get("/getLatestTransactions", async (req, res) => {
  const transactions = await ethersService.getLatestTransactions();
  res.json(transactions);
});

module.exports = router;
