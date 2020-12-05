export {};
import { Request, Response } from 'express';
import { RecipeController } from '../controllers/RecipeController';
import bodyParser from 'body-parser';
import { Recipe } from '../entities/Recipe';
import { authenticateToken } from '../middleware/authentication';

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

router.get('/pageRecipes/:pageNumber', async (req: Request, res: Response) => {
  let pageNumber = Number(req.params.pageNumber);

  try {
    const recipes = await RecipeController.pageRecipes(pageNumber, 'createdDate');

    console.log('REC: ', recipes);

    return res.json(recipes).status(200);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

router.get('/getRecipeById/:id', async (req: Request, res: Response) => {
  let recipe = await Recipe.findOne(req.params.id);

  return res.json(recipe).status(200);
});

router.get('/getRecipesForUser/:userUuid', async (req: Request, res: Response) => {
  const recipes = await RecipeController.getRecipesForUser(req.params.userUuid);

  return res.json(recipes).status(200);
});

router.get('/searchRecipesByName/:searchString', async (req: Request, res: Response) => {
  let recipes = await RecipeController.searchRecipesByName(req.params.searchString);

  return res.json(recipes).status(200);
});

router.get('/pageRecipesByName/:pageNumber/:searchString', async (req: Request, res: Response) => {
  let pageNumber = Number(req.params.pageNumber);
  let searchString = req.params.searchString;

  try {
    const recipes = await RecipeController.pageRecipesByName(pageNumber, searchString);

    return res.json(recipes).status(200);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

router.delete('/deleteRecipe/:id', async (req: Request, res: Response) => {
  let id = Number(req.params.id);
  try {
    await RecipeController.deleteRecipe(id);

    return res.json({ message: 'deleted recipe' }).status(200);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

router.post('/createRecipe', authenticateToken, async (req: Request, res: Response) => {
  let recipe = new Recipe();

  const {
    id,
    title,
    imageExtension,
    description,
    instructions,
    ingredients,
    prepMinutes,
    cookMinutes,
    yieldAmount
  } = req.body.recipe;

  const userUuid = req.body.userUuid;

  recipe.id = id;
  recipe.title = title;
  recipe.description = description;
  recipe.instructions = instructions;
  recipe.ingredients = ingredients;
  recipe.prepMinutes = prepMinutes;
  recipe.cookMinutes = cookMinutes;
  recipe.yieldAmount = yieldAmount;
  recipe.imageExtension = imageExtension;

  try {
    await RecipeController.createRecipe(recipe, userUuid);
    return res.json(recipe).status(201);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
