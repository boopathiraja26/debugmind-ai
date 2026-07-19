const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const streamRoutes = require("./routes/streamRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const repositoryRoutes = require("./routes/repositoryRoutes");

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// =============================
// Security Middleware
// =============================

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

if (process.env.NODE_ENV !== "test") {
  app.use(
    morgan(
      process.env.NODE_ENV === "production"
        ? "combined"
        : "dev"
    )
  );
}

// =============================
// Rate Limiter
// =============================

const limiter = rateLimit({
  windowMs:
    Number(process.env.RATE_LIMIT_WINDOW_MS) ||
    15 * 60 * 1000,

  max:
    Number(process.env.RATE_LIMIT_MAX) ||
    100,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests, please try again later.",
  },
});

app.use("/api", limiter);

// =============================
// Root Route
// =============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 DebugMind AI Backend is Running",
    version: "1.0.0",
    environment:
      process.env.NODE_ENV || "development",
    documentation: "/api/health",
  });
});

// =============================
// Health Check
// =============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DebugMind AI API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// =============================
// API Routes
// =============================

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/repository", repositoryRoutes);

// =============================
// Error Handlers
// =============================

app.use(notFound);
app.use(errorHandler);

module.exports = app;