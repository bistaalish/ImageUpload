const mongoose = require('mongoose');

// Define the schema for the image model
const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Image model based on the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
