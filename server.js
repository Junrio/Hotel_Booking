// Hotel Booking System - Main Server File
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // In development, allow all origins
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    // In production, check against whitelist
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:3001",
      "http://localhost:3000",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3000",
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Hotel Booking System API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      rooms: "/api/rooms",
      admin: "/api/admin",
    },
  });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working!",
    origin: req.headers.origin || "no origin header",
    method: req.method,
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Hotel Booking System API server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
  console.log(`📍 Rooms API: http://localhost:${PORT}/api/rooms`);
  console.log(`📍 CORS Test: http://localhost:${PORT}/api/cors-test`);
  console.log(`🌐 NODE_ENV: ${process.env.NODE_ENV || "production"}`);
  console.log(
    `🔓 CORS: ${process.env.NODE_ENV === "development" ? "Allow All Origins" : "Restricted"}`,
  );
});
