// import express from "express";
// Add Express
const express = require("express");

// Initialize Express
// import { router as orderRouter } from "./routes/order.route.js";
// import bodyParser from "body-parser";

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/api/order", (req, res) => {
  res.send("PONG");
});

// app.use("/api", orderRouter);

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

module.exports = app;
