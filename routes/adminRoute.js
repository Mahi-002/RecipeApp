const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/banUser/:userId', adminController.banUser);
router.delete('/deleteRecipe/:recipeId', adminController.deleteRecipe);

module.exports = router;
