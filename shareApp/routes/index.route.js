const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');

// import controller for index
const indexController = require('../controllers/index.controller');


router.get('/', authMiddleware.validToken, indexController.login );


router.get('/home', indexController.home);

module.exports = router;
