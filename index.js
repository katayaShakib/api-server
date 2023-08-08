const express = require('express');
const swaggerUi = require('swagger-ui-express');
/* const swaggerDocument = require('./swaggerDoc'); */
const specs = require('./swaggerDef');

const app = express();
const ethersController = require('./controllers/ethersController');
const ccxtController = require('./controllers/ccxtController');

const PORT = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/ethers', ethersController);
app.use('/ccxt', ccxtController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
