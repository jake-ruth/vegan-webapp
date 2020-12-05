import { ApplicationUser } from '../entities/ApplicationUser';
import { Like, getRepository, Repository, getConnection } from 'typeorm';
import { Recipe } from '../entities/Recipe';

interface PageRecipeReturnType {
  recipes: any[];
  totalCount: number;
}

export class RecipeController {
  static pageRecipes = async (page: number, orderByField: string): Promise<PageRecipeReturnType> => {
    const recipes = await Recipe.find({ order: { createdDate: 'DESC' }, skip: page * 8, take: 8 });
    const totalCount = await Recipe.count();

    return { recipes, totalCount };
  };

  static pageRecipesByName = async (page: number, searchString: string): Promise<PageRecipeReturnType> => {
    let formatted = searchString.replace(/'/g, "''");

    const recipes = await Recipe.find({
      order: { createdDate: 'DESC' },
      skip: page * 8,
      take: 8,
      where: `"title" ILIKE '%${formatted}%'`
    });
    const totalCount = await Recipe.count({ where: `"title" ILIKE '%${formatted}%'` });

    return { recipes, totalCount };
  };

  static getRecipesForUser = async (userUuid: string) => {
    //Todo: look into why I have to do this instead of just using uuid directly
    const user = await ApplicationUser.findOne({ where: { uuid: userUuid } });

    return await Recipe.find({ where: { applicationUser: { id: user?.id } } });
  };

  static createRecipe = async (recipe: Recipe, userUuid: string) => {
    const fullUser = await ApplicationUser.findOne({ where: { uuid: userUuid } });
    recipe.applicationUser = fullUser!;

    return await Recipe.save(recipe);
  };

  static deleteRecipe = async (id: number) => {
    return await Recipe.delete(id);
  };

  static searchRecipesByName = async (searchString: string) => {
    return await Recipe.find({ where: { title: Like(`%${searchString}%`) } });
  };
}
