const express = require("express");
const app = express();
const ethersController = require("./controllers/ethersController");

const PORT = 3000;

app.use(express.json());

app.use("/ethers", ethersController);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
