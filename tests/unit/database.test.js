const mongoose = require('mongoose');
const connectToDatabase = require('../../config/database');
const config = require('../../config/config');

jest.mock('mongoose');

describe('Database Connection', () => {
  it('should establish a successful database connection', async () => {
    // Mock the successful mongoose.connect method
    mongoose.connect.mockResolvedValue();

    // Call the database connection function
    await connectToDatabase();

    // Expect that the mongoose.connect method was called with the correct URL and options
    expect(mongoose.connect).toHaveBeenCalledWith(
      config.mongodb.url,
      config.mongodb.options
    );
  });

  it('should handle the error if the database connection fails', async () => {
    const errorMessage = 'Authentication failed';

    // Mock the rejected mongoose.connect method
    mongoose.connect.mockRejectedValue(new Error(errorMessage));

    // Expect that the console.error method was called with the correct error message
    console.error = jest.fn();

    // Call the database connection function and expect it to throw an error
    await expect(connectToDatabase()).rejects.toThrow(`${errorMessage}`);

    // Verify that the console.error method was called with the correct error message
    expect(console.error).toHaveBeenCalledWith("Error connecting to MongoDB:", "Authentication failed");
  });
});
