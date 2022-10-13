const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./src/models");

db.sequelize.sync({ force: false, alter: false });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/healthcheck", (req, res) => {
  res.send("Hello World!");
});
require("./src/routes")(app);
require("./src/routes/reuseCRUD")(app);

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
