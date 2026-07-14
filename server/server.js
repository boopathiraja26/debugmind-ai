const dns = require("dns");

// Force Node.js to use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(
        `[Server] DebugMind AI backend running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });

    process.on("unhandledRejection", (err) => {
      console.error("[Unhandled Rejection]", err);
      server.close(() => process.exit(1));
    });

    process.on("uncaughtException", (err) => {
      console.error("[Uncaught Exception]", err);
      process.exit(1);
    });

    process.on("SIGTERM", () => {
      console.log("[Server] SIGTERM received");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();