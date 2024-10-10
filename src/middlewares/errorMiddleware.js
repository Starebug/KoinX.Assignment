// middleware/errorHandler.js

// Catch-all route for undefined API endpoints
const notFoundHandler = (req, res, next) => {
    const error = new Error('API endpoint not found');
    error.status = 404;
    next(error); // Pass the error to the next middleware
  };
  const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500); // Set the response status
    res.json({
      success: false,
      message: error.message || 'Internal Server Error',
      status: error.status || 500,
    });
  };
  
  module.exports = { notFoundHandler, errorHandler };
  