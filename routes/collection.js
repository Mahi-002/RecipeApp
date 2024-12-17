const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/containerController');

router.post('/addRecipe', collectionController.createContainer);

module.exports = router;
