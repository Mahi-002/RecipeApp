const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

router.post('/follow', followController.followUser);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);

module.exports = router;
