// Error Middleware to handle server errors (500)
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  // Error Middleware to handle not found errors (404)
  const notFoundHandler = (req, res) => {
    res.status(404).json({ error: 'Not Found' });
  };
  
  // Error Middleware to handle validation errors (400)
  const validationErrorHandler = (err, req, res, next) => {
    if (err.isJoi) {
      // Joi validation error
      const errorDetails = err.details.map((detail) => {
        return {
          message: detail.message,
          field: detail.context.key,
        };
      });
      res.status(400).json({ error: 'Validation Error', details: errorDetails });
    } else {
      next(err);
    }
  };
  
  module.exports = {
    errorHandler,
    notFoundHandler,
    validationErrorHandler,
  };
  