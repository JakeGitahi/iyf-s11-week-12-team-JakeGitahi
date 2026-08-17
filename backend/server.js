require("dotenv").config();

const dns = require("dns");

// Use reliable public DNS servers for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();