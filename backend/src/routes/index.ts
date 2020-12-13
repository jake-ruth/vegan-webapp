const applicationUserRoutes = require('./applicationUserRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');

const routers = [applicationUserRoutes, recipeRoutes, favoriteRoutes];

module.exports = routers;
