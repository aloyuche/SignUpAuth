const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Server is connected to MongoDB"))
  .catch((error) => console.log(error));

app.listen(
  process.env.PORT,
  console.log(`Server is running on port ${process.env.PORT}`)
);
