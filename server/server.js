const dns = require("node:dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(
      `[Server] DebugMind AI backend running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });

  process.on("unhandledRejection", (err) => {
    console.error(err);
    server.close(() => process.exit(1));
  });

  process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
  });
};

startServer();