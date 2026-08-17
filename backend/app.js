const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    status: "ok",
    database: databaseConnected ? "connected" : "disconnected"
  });
});

module.exports = app;