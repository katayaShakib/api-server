/**
 * @swagger
 * tags:
 *   name: Ethers
 *   description: Ethers API
 */

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

/**
 * @swagger
 * tags:
 *   name: CCXT
 *   description: CCXT API
 */

/**
 * @swagger
 * /ccxt/tradableCoins:
 *   get:
 *     summary: Get the list of tradable coins on Binance
 *     tags: [CCXT]
 *     responses:
 *       200:
 *         description: Array of tradable coin objects containing the coins' symbol
 *         content:
 *           application/json:
 *             example:
 *               - symbol: BTC
 *               - symbol: ETH
 *       500:
 *         description: Error occurred while fetching tradable coins
 */

/**
 * @swagger
 * /ccxt/tradableCoins/averagePrices:
 *   get:
 *     summary: Get the list of tradable coins on Binance with their average prices
 *     tags: [CCXT]
 *     responses:
 *       200:
 *         description: Array of tradable coin objects containing the coins' symbol and average price
 *         content:
 *           application/json:
 *             example:
 *               - symbol: BTC/USDT averagePrice: 40000.0
 *               - symbol: ETH/USDT averagePrice: 2000.0
 *       500:
 *         description: Error occurred while fetching the average price
 */
