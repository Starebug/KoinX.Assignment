const express = require("express");
const router = express.Router();
const {calculateDeviation} = require('../controllers/deviationController');
router.route('/').get(calculateDeviation);
module.exports = router;