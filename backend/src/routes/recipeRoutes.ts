export {};
import { Request, Response } from 'express';
import { RecipeController } from '../controllers/RecipeController';
import bodyParser from 'body-parser';
import { Recipe } from '../entities/Recipe';

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

router.post('/createRecipe', async (req: Request, res: Response) => {
  let recipe = new Recipe();

  const { title, description, instructions, ingredients, prepMinutes, cookMinutes } = req.body;

  recipe.title = title;
  recipe.description = description;
  recipe.instructions = instructions;
  recipe.ingredients = ingredients;
  recipe.prepMinutes = prepMinutes;
  recipe.cookMinutes = cookMinutes;

  try {
    await RecipeController.createRecipe(recipe);
    return res.json(recipe).status(201);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;