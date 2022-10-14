const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/saleRoutes");
const authRouter = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// connecting to database
mongoose.connect(process.env.MONGO_URI, () => {
  app.listen(process.env.PORT);
  console.log("connected to the database");
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

// routes
app.use("/sale/api", router);
app.use("/auth", authRouter);
