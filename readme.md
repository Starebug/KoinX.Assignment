KoinX Backend Internship Assignment

This Node.js application fetches cryptocurrency price data, stores it in a MongoDB database, and provides APIs to access and analyze the data.

Prerequisites:

Node.js and npm (or yarn) installed
MongoDB instance (e.g., MongoDB Atlas)
Installation:

Clone this repository: git clone https://github.com/your-username/koinx-assignment
Install dependencies: npm install (or yarn install)
Set up environment variables:
Create a .env file in the project root.
Add the following variables with your values:
MONGODB_URI (MongoDB connection string)
COINGECKO_API_KEY (CoinGecko API key)
Run the application: npm start (or yarn start)
API Endpoints:

/stats: Retrieves the latest price data for a specified cryptocurrency.
Query parameter: coin (e.g., bitcoin, matic-network, ethereum)
/deviation: Calculates the standard deviation of the price for a specified cryptocurrency.
Query parameter: coin
Usage:

Make requests to the API endpoints using your preferred HTTP client (e.g., curl, Postman).
The responses will be in JSON format.
Additional Notes:

The application uses a background job to fetch price data every 2 hours.
You can modify the scheduling interval or add more cryptocurrencies as needed.
For deployment, consider using platforms like Heroku, AWS, or GCP.
Contributions:

Contributions are welcome! Please feel free to fork the repository and submit pull requests.