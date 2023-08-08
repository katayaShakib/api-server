const express = require('express');

const app = express();
const ethersController = require('./controllers/ethersController');
const ccxtController = require('./controllers/ccxtController');

const PORT = 3000;

app.use(express.json());

// Use ethersController and ccxtController
app.use('/ethers', ethersController);
app.use('/ccxt', ccxtController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
