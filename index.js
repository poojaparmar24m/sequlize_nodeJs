const express = require("express");
const app = express();
const sequelize = require("./src/config/dbConnection");
const routers = require("./src/routers/index");
const cors = require("cors");
const port = 8081;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected successfully !");
  })
  .catch((err) => {
    console.log("err", err.message);
  });
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running !",
  });
});
app.use("/", routers);
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
