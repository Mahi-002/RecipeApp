const User = require('../models/UserSchema');
const Recipe = require('../models/RecipeSchema');
const Collection = require('../models/collections');
const Follow = require('../models/follow')

User.hasMany(Collection, { foreignKey: 'userId' });
Collection.belongsTo(User, { foreignKey: 'userId' });

Collection.belongsToMany(Recipe, { through: 'CollectionRecipes' });
Recipe.belongsToMany(Collection, { through: 'CollectionRecipes' });

User.hasMany(Recipe)
Recipe.belongsTo(User)

User.belongsToMany(User, { as: 'Followers', through: Follow, foreignKey: 'followerId' }); 
User.belongsToMany(User, { as: 'Following', through: Follow, foreignKey: 'followingId' });

module.exports = {
    User,
    Recipe,
    Collection,
    Follow
};
