var express = require('express');
var router = express.Router();

const objectController = require('../controllers/object.controller');

router.get('/', objectController.list);
router.post('/', objectController.create);
router.get( '/:objectId', objectController.getObject);
router.put( '/:objectId', objectController.updateObject);
router.delete('/:objectId', objectController.deleteObject );


module.exports = router;

