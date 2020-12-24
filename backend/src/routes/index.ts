const applicationUserRoutes = require('./applicationUserRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const collectionRoutes = require('./collectionRoutes');

const routers = [applicationUserRoutes, recipeRoutes, favoriteRoutes, collectionRoutes];

module.exports = routers;
