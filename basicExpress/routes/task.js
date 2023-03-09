var express = require('express');
var router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', taskController.list);
router.post('/', taskController.create);

module.exports = router;

