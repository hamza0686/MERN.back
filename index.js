require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./database/db");

const authRoutes = require("./routes/Auth");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const brandRoutes = require("./routes/Brand");
const categoryRoutes = require("./routes/Category");
const userRoutes = require("./routes/User");
const addressRoutes = require("./routes/Address");
const reviewRoutes = require("./routes/Review");
const wishlistRoutes = require("./routes/Wishlist");

// Initialize server
const server = express();

// Connect to the database
connectToDB();

// Middlewares
server.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000", // Default to frontend URL
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// Route middlewares
server.use("/api/auth", authRoutes);
server.use("/api/users", userRoutes);
server.use("/api/products", productRoutes);
server.use("/api/orders", orderRoutes);
server.use("/api/cart", cartRoutes);
server.use("/api/brands", brandRoutes);
server.use("/api/categories", categoryRoutes);
server.use("/api/address", addressRoutes);
server.use("/api/reviews", reviewRoutes);
server.use("/api/wishlist", wishlistRoutes);

// Root route
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start the server
const PORT = process.env.PORT || 7666;
server.listen(PORT, () => {
  console.log(`Server [STARTED] ~ http://localhost:${PORT}`);
});
