import { Recipe } from '../entities/Recipe';
import { ApplicationUser } from '../entities/ApplicationUser';
import { Favorite } from '../entities/Favorite';

export class FavoriteController {
  static createFavorite = async (recipeId: number, applicationUserId: number) => {
    let favorite = new Favorite();
    let user = await ApplicationUser.findOne(applicationUserId);
    let recipe = await Recipe.findOne(recipeId);

    if (!user || !recipe) throw new Error('Invalid user id or recipe id');
    favorite.applicationUser = user;
    favorite.recipe = recipe;

    return await Favorite.save(favorite);
  };

  static readFavorites = async (applicationUserId: number) => {
    const favorites = await Favorite.find({ where: { applicationUser: { id: applicationUserId } } });

    return favorites;
  };
}
