const express = require("express");
const router = express.Router();
const {coinStats} = require('../controllers/statsController');
router.route('/').get(coinStats);
module.exports = router;