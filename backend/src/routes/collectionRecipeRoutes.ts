export {};
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { CollectionRecipeController } from '../controllers/CollectionRecipeController';
import { authenticateToken } from '../middleware/authentication';

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

router.get('/getCollectionRecipes/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const response = await CollectionRecipeController.readCollectionRecipes(Number(req.params.userId));
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/getCollectionRecipesByCollection/:collectionId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const response = await CollectionRecipeController.readCollectionRecipesByCollection(Number(req.params.collectionId));
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.delete('/deleteCollectionRecipe/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const response = await CollectionRecipeController.deleteCollectionRecipe(Number(req.params.id));
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
