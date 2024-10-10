const axios = require('axios');
const {Crypto} = require('../models/crytoModel');
const cron = require('node-cron');
const fetchCryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(
        ','
      )}`,
        headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.GECKO_KEY  }
      };
      const response = await axios.request(options);
      const data = response.data; // Save the response in the data object
      data.forEach(async (coinData) => {
        await Crypto.create({
          coin: coinData.id, // `id` contains the coin's name, e.g., 'bitcoin'
          price: coinData.current_price, // `current_price` contains the coin's price
          marketCap: coinData.market_cap, // `market_cap` contains the coin's market cap
          change24h: coinData.price_change_percentage_24h, // `price_change_percentage_24h` contains the 24h change percentage
        });
      });
    console.log('Data fetched and stored in the database successfully!');
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
  }
};
const runFetchCryptoData = async () => {
  await fetchCryptoData();
  console.log('Initial fetch of crypto data executed.');
};
runFetchCryptoData();
const startCryptoJob = () => {
  // Log when the job is started
  console.log('Starting the crypto job scheduler...');

  // Schedule the cron job to run every 2 hours
  cron.schedule('0 */2 * * *', async () => {
      await fetchCryptoData();
      console.log('Scheduled task to fetch crypto data executed.');
  });
};

module.exports = { startCryptoJob };
