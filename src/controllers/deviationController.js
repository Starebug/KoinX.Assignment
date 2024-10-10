const asyncHandler = require('express-async-handler');
const {Crypto} = require('../models/crytoModel');
const calculateDeviation = asyncHandler(async(req,res) => {
    const coin = req.query.coin;
    if (!coin) return res.status(400).send({ error: 'Coin is required' });
    try {
      const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
      if (records.length < 2) return res.status(400).send({ error: 'Not enough data for calculation' });

      const prices = records.map(record => record.price);
      const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  
      const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
      const standardDeviation = Math.sqrt(variance);
      console.log("Executed");
      res.json({ deviation: standardDeviation.toFixed(2) });
    } catch (err) {
      res.status(500).send({ error: 'Server error' });
    }
  });
module.exports = {calculateDeviation};
  