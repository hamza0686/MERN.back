require("dotenv").config();
const authRoutes = require("./routes/Auth"); // use capital A to match file name
server.use("/api/auth", authRoutes);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
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
const { connectToDB } = require("./database/db");

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
server.use("/auth", authRoutes);
server.use("/users", userRoutes);
server.use("/products", productRoutes);
server.use("/orders", orderRoutes);
server.use("/cart", cartRoutes);
server.use("/brands", brandRoutes);
server.use("/categories", categoryRoutes);
server.use("/address", addressRoutes);
server.use("/reviews", reviewRoutes);
server.use("/wishlist", wishlistRoutes);

// Root route
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start the server
const PORT = process.env.PORT || 7666;
server.listen(PORT, () => {
  console.log(`Server [STARTED] ~ http://localhost:${PORT}`);
});
