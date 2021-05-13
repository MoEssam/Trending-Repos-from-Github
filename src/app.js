require("dotenv").config();
const express = require("express");
const root = require("./routes/index");
const repos = require("./routes/repos");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use(root);
app.use(repos);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
