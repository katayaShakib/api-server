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

module.exports = {
  isValidWalletAddress,
};
