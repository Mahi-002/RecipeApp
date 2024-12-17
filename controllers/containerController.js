const Collection = require('../models/containerModel');
const Recipe = require('../models/RecipeSchema')

const Container = require('../models/containerModel');

exports.createContainer = async (req, res) => {
    try {
        const { name, userId } = req.body;
        const container = await Container.create({ name, userId });
        res.status(201).send(container);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getContainers = async (req, res) => {
    try {
        const userId = req.user.id; // Assume the user ID is provided by authentication middleware
        const containers = await Container.findAll({ where: { userId } });
        res.status(200).send(containers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteContainer = async (req, res) => {
    try {
        const { containerId } = req.params;
        await Container.destroy({ where: { id: containerId } });
        res.status(200).send({ message: 'Container deleted successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

