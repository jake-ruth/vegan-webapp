export {};
import { Request, Response } from 'express';
import { RecipeController } from '../controllers/RecipeController';
import bodyParser from 'body-parser';

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

router.get('/pageRecipes/:pageNumber', async (req: Request, res: Response) => {
  let pageNumber = Number(req.params.pageNumber);

  try {
    const recipes = await RecipeController.pageRecipes(pageNumber);

    console.log('REC: ', recipes);

    return res.json(recipes).status(200);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

module.exports = router;
