const express = require("express");
const cors = require("cors"); // Import the cors middleware
const helmet = require("helmet");
const morgan = require("morgan"); // Import the morgan middleware
const rateLimit = require("express-rate-limit");
const imageRoutes = require("./routes/imageRoutes")
require("dotenv").config()
const db = require("./config/database")
// const mongoose = require('mongoose');
// const config = require("./config/config")

// // Connect to MongoDB
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(config.mongodb.url, config.mongodb.options);
//     console.log("Connected to MongoDB!");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err.message);
//     throw err;
//   }
// };
db();
// connectToDatabase()
const app = express();
// Apply rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(express.json());
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
// Use the cors middleware to allow requests from the specified origins

app.use(cors({ origin: allowedOrigins }));

// Routes for images
app.use("/api",imageRoutes)

// Add the error middleware at the end of the middleware chain
const { errorHandler, notFoundHandler, validationErrorHandler } = require('./middlewares/errorMiddleware');
app.use(errorHandler);
app.use(notFoundHandler);
app.use(validationErrorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// app.use(function (req, res, next) {
//     req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
//     next()
//   })
  
module.exports = app



