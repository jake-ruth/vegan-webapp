import { Recipe } from '../entities/Recipe';
import { createConnection, getConnection } from 'typeorm';
import { RecipeController } from '../controllers/RecipeController';

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close();
});

let recipe = new Recipe();
recipe.title = 'Heyo Recipe';
recipe.description = 'Test Description';
recipe.instructions = 'Instructions';
recipe.prepMinutes = '10';
recipe.cookMinutes = '10';
recipe.createdDate = new Date();

let recipeId = 0;

describe('Recipe Tests', () => {
  it('should create recipe in the db', async () => {
    try {
      const result = await RecipeController.createRecipe(recipe, 'testUuid');
      recipeId = result.id;
      expect(result.title).toBe(recipe.title);
    } catch (err) {
      console.log('ERR: ', err);
    }
  });

  it('should delete recipe from db', async () => {
    try {
      const result = await Recipe.delete(recipeId);
      expect(result);
    } catch (err) {
      console.log('ERR: ', err);
    }
  });
});
