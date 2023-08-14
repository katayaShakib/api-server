# api-server

Api server using two libraries.

### 1. ethers.js

1. Returning boolean of wallet address is valid.
2. Creating wallet
3. Get latest 1000 transaction of etherium, return the result sorted by etherium quantity.
The transaction data:
- Transaction hash,
- sender address
- receiver address
- amount of ether transferred
- block number

### 2. ccxt

1. Get the list of coins which are tradable on Binance.
2. Get the list of each coin’s average price(**Average price of 100 recent transactions)**

## Usage
1. Download the project
2. Open a terminal at the projet's location
3. npm install
4. node createTables.js //if tables do not exist
5. npm start
6. You can visit `/api-docs` route for api documentation UI
