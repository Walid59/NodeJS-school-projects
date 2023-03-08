var express = require('express');
var router = express.Router();

const jsonController = require('../controllers/jsonController');

router.all('/', jsonController.json);
router.get('/random', jsonController.random);

module.exports = router;
