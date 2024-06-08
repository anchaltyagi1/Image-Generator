// Importing Modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const imageRouter = require("./routes/imageRouter.js");
const authRouter = require("./routes/authRouter.js");

// MongoDB Connection String
const connectionString = process.env.DATABASE_URL;
const port = process.env.PORT || 3001;

// Middleware and App Setup
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Basic route to check server status
app.get("/", (req, res) => {
  res.send({ message: "working" });
});

app.use("/api/v1/auth", authRouter);

// Authentication Middleware
app.use((req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];

    try {
      jwt.verify(token, process.env.SECRET);
      next();
    } catch (e) {
      console.error("Token verification failed:", e);
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
});

app.use("/api/v1/images", imageRouter);

// 404 Route
app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

// Connecting to MongoDB and Starting Server
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server is live on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
