var express = require('express');
var router = express.Router();

// @route   GET api/mts
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.send('MTS route');
}); 

module.exports = router;
