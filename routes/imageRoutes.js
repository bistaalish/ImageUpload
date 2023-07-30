const express = require('express');
const router = express.Router();
const { upload } = require("../controllers/imageController")

// Import the controllers/handlers for each route
const imageController = require('../controllers/imageController');

// Define the API routes

// POST /api/upload - Upload an image
router.post('/images', upload.single("image"),imageController.uploadImage);

// GET /api/images - Get all uploaded images
router.get('/images', imageController.getAllImages);

// GET /api/images/:id - Get a specific image by ID
router.get('/images/:id', imageController.getImageById);

// PUT /api/images/:id - Update an image
router.put('/images/:id', imageController.updateImage);

// DELETE /api/images/:id - Delete an image
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;