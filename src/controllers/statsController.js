const asyncHandler = require('express-async-handler');
const {Crypto} = require('../models/crytoModel');
const coinStats = asyncHandler(async(req,res) => {
    const coin = req.query.coin;
    if (!coin) return res.status(400).send({ error: 'Coin is required' });
    try{
        const coinData = await Crypto.findOne({coin: coin}).sort({ timestamp: -1 }).exec();
        if (!coinData) {
            return res.status(404).json({ message: 'Coin not found' }); // 404 Not Found
          }
          return res.status(200).json(coinData); // 200 OK
    }catch(e) {
        console.error('Error fetching coin data:', e);
        return res.status(500).json({ message: 'Internal server error' }); // 500 Internal Server Error
       }  
})
module.exports = {coinStats};