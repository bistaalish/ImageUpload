const mongoose = require('mongoose');
const Image = require('../../models/imageModel');

describe('Image Model', () => {
  // Define test data for an image
  const testImage = {
    filename: 'test-image.jpg',
    mimetype: 'image/jpeg',
    size: 1024,
    url: 'https://example.com/images/test-image.jpg',
  };

  // Before each test, reset the mongoose models
  beforeEach(() => {
    // Reset the mongoose model for the Image collection
    mongoose.models = {};
    mongoose.modelSchemas = {};
  });

  it('should create and save an image', async () => {
    // Create a new image using the Image model
    const image = new Image(testImage);

    // Save the image to the database
    const savedImage = await image.save();

    // Expect that the saved image has the same properties as the test image
    expect(savedImage.filename).toBe(testImage.filename);
    expect(savedImage.mimetype).toBe(testImage.mimetype);
    expect(savedImage.size).toBe(testImage.size);
    expect(savedImage.url).toBe(testImage.url);
    expect(savedImage.createdAt).toBeDefined();
  },30000);

  it('should require filename, mimetype, size, and url fields', async () => {
    try {
      // Attempt to save an image with missing required fields
      await Image.create({});
    } catch (error) {
      // Expect that the error contains validation messages for the missing fields
      expect(error.errors['filename'].message).toBe('Path `filename` is required.');
      expect(error.errors['mimetype'].message).toBe('Path `mimetype` is required.');
      expect(error.errors['size'].message).toBe('Path `size` is required.');
      expect(error.errors['url'].message).toBe('Path `url` is required.');
    }
  },);
});
