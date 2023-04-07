const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');

// import controller for index
const userController = require('../controllers/user.controller');

router.get('/me', authMiddleware.validToken, userController.me );
router.put('/me', authMiddleware.validToken, userController.update );
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);

module.exports = router;
