const applicationUserRoutes = require('./applicationUserRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const collectionRoutes = require('./collectionRoutes');
const collectionRecipeRoutes = require('./collectionRecipeRoutes');

const routers = [applicationUserRoutes, recipeRoutes, favoriteRoutes, collectionRoutes, collectionRecipeRoutes];

module.exports = routers;
