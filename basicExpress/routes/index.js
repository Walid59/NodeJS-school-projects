var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.home );

router.get('/first', indexController.first);

router.get('/second', indexController.second);

router.get('/todo', indexController.todo);

//router.get('/todo', indexController.list);
module.exports = router;
