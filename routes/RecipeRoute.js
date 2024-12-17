const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/middleware")
const recipeRouter = require("../controllers/RecipeController")

router.get('/get',recipeRouter.getAllRecipes);
router.post('/create',authenticate,recipeRouter.createRecipe);
 router.get('/user',authenticate,recipeRouter.getUserRecipes)
// router.get('/likedRecipes/:id',authenticate,recipeRouter.getAllLikedRecipes);
// router.delete('/recipe/:id',authenticate,recipeRouter.deleteRecipe);
// router.post('/likedRecipes/:id',authenticate,recipeRouter.LikedList);
// router.delete('/removeLiked/:id',authenticate,recipeRouter.removeFromLikedRecipes);
// router.get('/searchRecipes/:key',authenticate,recipeRouter.searchRecipes);

module.exports = router;
