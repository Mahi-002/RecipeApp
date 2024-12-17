const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');

exports.banUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.update({ banned: true }, { where: { id: userId } });
        res.status(200).send({ message: 'User banned successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;
        await Recipe.destroy({ where: { id: recipeId } });
        res.status(200).send({ message: 'Recipe deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
