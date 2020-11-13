import { Like, getRepository, Repository, getConnection } from 'typeorm';
import { Recipe } from '../entities/Recipe';

interface PageRecipeReturnType {
  recipes: any[];
  totalCount: number;
}

export class RecipeController {
  static pageRecipes = async (page: number, orderByField: string): Promise<PageRecipeReturnType> => {
    const recipes = await Recipe.find({ order: { createdDate: 'DESC' }, skip: page * 6, take: 6 });
    const totalCount = await Recipe.count();

    return { recipes, totalCount };
  };

  static pageRecipesByName = async (page: number, searchString: string): Promise<PageRecipeReturnType> => {
    let formatted = searchString.replace(/'/g, "''");

    const recipes = await Recipe.find({
      order: { createdDate: 'DESC' },
      skip: page * 6,
      take: 6,
      where: `"title" ILIKE '%${formatted}%'`
    });
    const totalCount = await Recipe.count({ where: `"title" ILIKE '%${formatted}%'` });

    return { recipes, totalCount };
  };

  static createRecipe = async (recipe: Recipe) => {
    return await Recipe.save(recipe);
  };

  static searchRecipesByName = async (searchString: string) => {
    return await Recipe.find({ where: { title: Like(`%${searchString}%`) } });
  };
}
