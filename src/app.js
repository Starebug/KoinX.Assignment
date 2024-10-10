const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require('./config/db');
const statsRoute = require('./routes/statsRoute');
const deviationRoute = require('./routes/deviationRoute');
const {startCryptoJob} = require('./jobs/cryptoJob');

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
    res.send("API is running");
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
