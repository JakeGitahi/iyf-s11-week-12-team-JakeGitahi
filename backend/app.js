const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", commentRoutes);
app.use("/api/posts", postRoutes);


app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    status: "ok",
    database: databaseConnected ? "connected" : "disconnected"
  });
});

module.exports = app;