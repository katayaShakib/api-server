const express = require("express");
const ethersService = require("../services/ethersService");

const router = express.Router();

router.get("/isValidWalletAddress/:address", (req, res) => {
  const { address } = req.params;
  const isValid = ethersService.isValidWalletAddress(address);
  res.json({ isValid });
});

module.exports = router;
