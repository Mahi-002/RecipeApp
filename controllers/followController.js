const Follow = require('../models/follow');
const  User = require('../models/UserSchema');
exports.followUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

        // Check if the follow relationship already exists
        const existingFollow = await Follow.findOne({ where: { followerId, followingId } });
        if (existingFollow) {
            return res.status(400).send({ message: 'You are already following this user.' });
        }

        const follow = await Follow.create({ followerId, followingId });
        res.status(201).send(follow);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const followers = await Follow.findAll({
            where: { followingId: userId },
            include: [{ model: User, as: 'Followers' }]
        });
        res.send(followers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const following = await Follow.findAll({
            where: { followerId: userId },
            include: [{ model: User, as: 'Following' }]
        });
        res.send(following);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
