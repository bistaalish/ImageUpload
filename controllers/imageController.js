// Import the Image model (assuming you have a model for storing image data)
const Image = require('../models/imageModel');
const multer = require("multer")
const path = require('path');
const fs = require('fs');
// Controller functions for each route related to image uploads
// Define the path to your file

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded image
    },
  });

  // Multer upload instance
const upload = multer({ storage });
  
const uploadImage = async (req, res) => {
    // Check if there is a file in the request
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  // Create a new image document in the database
  const newImage = new Image({
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: `/api/uploads/${req.file.filename}`,
  });

  // Save the image document to the database
  newImage.save()
    .then((image) => {
      // Return the saved image data in the response
      res.json(image);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to save image to the database' });
    });
};

const getAllImages = async (req, res) => {
  try {
    // Find all images in the database
    const images = await Image.find();

    // If there are no images, return an empty array as the response
    if (!images || images.length === 0) {
      return res.status(200).json([]);
    }

    // Return the array of images as the response
    return res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images from the database:', error);
    // If there is any error during the database query, return a 500 Internal Server Error response
    return res.status(500).json({ error: 'Server error' });
  }
}

const getImageById = async (req, res) => {
    const id = req.params.id
    const filePath = path.join(__dirname, '../uploads/'+id);
    try {
        res.sendFile(filePath)
    } catch (error) {
        console.error('Error fetching image from the database:', error);
        return res.status(500).json({ error: 'Server error' });
    }
  // Implement logic to fetch a specific image by its ID from the database
  // Return the response with the image data
//   res.status(200).json({message:"successful",id});
};

const updateImage = async (req, res) => {
    const id = req.params.id
  // Implement logic to fetch a specific image by its ID from the database
  // Return the response with the image data
  res.status(200).json({message:"successful",id});
};

const deleteImage = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the image in the database based on the provided ID
      const image = await Image.find({filename:id});
  
      if (!image) {
        // If the image with the given ID is not found, return a 404 Not Found response
        return res.status(404).json({ error: 'Image not found' });
      }
  
      // Delete the image record from the database
      await Image.deleteOne({filename: id});
  
      // Get the absolute path of the image file on the server
      const imagePath = path.join(__dirname, '..', 'uploads', id);
  
      // Delete the image file from the server
      fs.unlinkSync(imagePath);
  
      // Return a success message as the response
      return res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image from the database:', error);
      // If there is any error during the database query or file deletion, return a 500 Internal Server Error response
      return res.status(500).json({ error: 'Server error' });
    }
  }

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  upload
};
