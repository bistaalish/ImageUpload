const express = require("express");
const cors = require("cors"); // Import the cors middleware
const helmet = require("helmet");
const morgan = require("morgan"); // Import the morgan middleware
const rateLimit = require("express-rate-limit");
const imageRoutes = require("./routes/imageRoutes")
require("dotenv").config()


const app = express();
// Apply rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(express.json());

// Routes for images
app.use("/api",imageRoutes)


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



