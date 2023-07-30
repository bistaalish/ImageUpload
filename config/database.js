const mongoose = require('mongoose');
const config = require("./config")

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongodb.url, config.mongodb.options);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw err;
  }
};



module.exports = connectToDatabase;
