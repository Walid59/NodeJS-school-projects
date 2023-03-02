var express = require('express');
var router = express.Router();

const jsonController = require('../controllers/jsonController');

router.get('/json', jsonController.some);

module.exports = router;
