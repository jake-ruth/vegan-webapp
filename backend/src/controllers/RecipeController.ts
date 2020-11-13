import { Recipe } from '../entities/Recipe';

export class RecipeController {
  static pageRecipes = async (page: number, orderByField: string) => {
    return await Recipe.find({ order: { createdDate: 'DESC' }, skip: page * 6, take: 6 });
  };

  static createRecipe = async (recipe: Recipe) => {
    return await Recipe.save(recipe);
  };
}
