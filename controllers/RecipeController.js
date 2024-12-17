const Recipe  = require("../models/RecipeSchema"); // Import Sequelize models
const { Liked } = require("../models/LikedRecipeSchema")

const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, dietaryPreference, cookingTime, servings, category, preparationTime, difficultyLevel } = req.body;
        const newRecipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            dietaryPreference,
            cookingTime,
            servings,
            category,
            preparationTime,
            difficultyLevel,
            userId: req.user.id // Assuming req.user.id is set by your authentication middleware
        });

        res.status(201).send(newRecipe);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getUserRecipes = async (req, res) => {
  try {
      const userId = req.user.id; // Assume the user ID is provided by authentication middleware
      const recipes = await Recipe.findAll({ where: { userId } });
      res.status(200).send(recipes);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
};


// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
     const recipes = await Recipe.findAll(); res.status(200).send(recipes); 
    } catch (error) 
    { 
      res.status(500).send({ message: error.message }); 
    }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.destroy({ where: { id: recipeId } });

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add a recipe to liked recipes
const LikedList = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const existingFavorite = await Liked.findOne({ where: { title: recipe.title } });

    if (existingFavorite) {
      return res.status(400).json({ error: "Recipe already in favorites" });
    }

    const newFavorite = await Liked.create({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
    });

    res.status(201).json({ favoriteRecipe: newFavorite });
  } catch (error) {
    console.error("Error adding to liked recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all liked recipes
const getAllLikedRecipes = async (req, res) => {
  try {
    const allLikedRecipes = await Liked.findAll();
    res.status(200).json(allLikedRecipes);
  } catch (error) {
    console.error("Error fetching liked recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove a recipe from liked recipes
const removeFromLikedRecipes = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const deletedLikedRecipe = await Liked.destroy({ where: { id: recipeId } });

    if (!deletedLikedRecipe) {
      return res.status(404).json({ error: "Liked recipe not found" });
    }

    res.status(200).json({ message: "Recipe removed from liked recipes" });
  } catch (error) {
    console.error("Error removing liked recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search recipes by title
const searchRecipes = async (req, res) => {
  const searchKey = req.params.key;

  try {
    const recipes = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${searchKey}%`, // Case-insensitive search
        },
      },
    });

    if (!recipes.length) {
      return res.status(404).json({ message: "No recipes found" });
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  deleteRecipe,
  LikedList,
  getAllLikedRecipes,
  removeFromLikedRecipes,
  searchRecipes,
  getUserRecipes
};
