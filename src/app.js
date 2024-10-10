const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require('./config/db');
const statsRoute = require('./routes/statsRoute');
const deviationRoute = require('./routes/deviationRoute');
const {startCryptoJob} = require('./jobs/cryptoJob');
const {notFoundHandler,errorHandler} = require('./middlewares/errorMiddleware');
// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './.env') });

// Initialize the Express application
const app = express();

// Connect to the database
connectDB();

// Start the crypto job
startCryptoJob();

// Set the server port
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined

// Middleware for parsing request bodies (if needed)
// app.use(express.json()); // Uncomment if you plan to handle JSON payloads

// Define routes
app.use('/stats', statsRoute);
app.use('/deviation', deviationRoute);

// Define a default route
app.get('/', (req, res) => {
    res.json({
      message: "API is running",
      validRoutes: {
        '/stats?coin=<coin>': 'Returns the latest data about a specific cryptocurrency (e.g.,?coin=bitcoin)',
        '/deviation?coin=<coin>': 'Get deviation for a specified coin (e.g., ?coin=ethereum)',
        // Add more routes here
      },
    });
  });  

app.use(notFoundHandler);

// Use the errorHandler middleware for handling errors
app.use(errorHandler);
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});