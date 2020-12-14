export {};
import { Request, Response } from 'express';
import { RecipeController } from '../controllers/RecipeController';
import bodyParser from 'body-parser';
import { Recipe } from '../entities/Recipe';
import { authenticateToken } from '../middleware/authentication';
import { FavoriteController } from '../controllers/FavoriteController';

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

router.post('/addRecipeToFavorites', async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const response = await FavoriteController.createFavorite(body.recipeId, body.userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/getFavoriteRecipes/:userId', async (req: Request, res: Response) => {
  try {
    const response = await FavoriteController.readFavorites(Number(req.params.userId));
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
