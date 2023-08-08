const db = require('./database');

// Create Ethereum transactions table
db.run(`
  CREATE TABLE IF NOT EXISTS ethereum_transactions (
    id INTEGER PRIMARY KEY,
    transactionHash TEXT NOT NULL,
    senderAddress TEXT NOT NULL,
    receiverAddress TEXT NOT NULL,
    amountTransferred REAL NOT NULL,
    blockNumber INTEGER NOT NULL
  )
`);

// Create Binance tradable coins table
db.run(`
  CREATE TABLE IF NOT EXISTS binance_tradable_coins (
    id INTEGER PRIMARY KEY,
    symbol TEXT NOT NULL,
    averagePrice REAL NOT NULL
  )
`);

console.log('Database tables created.');
