const mongoose = require('mongoose');


// Connect to MongoDB
mongoose
  .connect(config.mongodb.url, config.mongodb.options)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });


module.exports = mongoose.connection;
