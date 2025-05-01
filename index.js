require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./database/db");

// Import routes
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

// Connect to DB
connectToDB();

// Middleware
server.use(
  cors({
    origin: process.env.ORIGIN || "https://mern-front-sigma.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan("tiny"));

// Routes
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

// Root
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Optional: Error handler
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start
const PORT = process.env.PORT || 7666;
server.listen(PORT, () => {
  console.log(`Server [STARTED] ~ http://localhost:${PORT}`);
});
