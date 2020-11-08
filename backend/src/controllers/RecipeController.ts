import { Recipe } from '../entities/Recipe';

export class RecipeController {
  static pageRecipes = async (page: number) => {
    return await Recipe.find({ skip: page * 20, take: 20 });
  };
}
