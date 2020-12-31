export {};
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { authenticateToken } from '../middleware/authentication';
import { CollectionController } from '../controllers/CollectionController';

const express = require('express');
const router = express.Router();
router.use(bodyParser.json());

router.post('/createCollection', authenticateToken, async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const response = await CollectionController.createCollection(body.title, body.userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/addRecipeToCollection', authenticateToken, async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const response = await CollectionController.addRecipeToCollection(body.recipeId, body.collectionId, body.userId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/getCollections/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const response = await CollectionController.readCollections(Number(req.params.userId));
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// router.delete('/deleteFavoriteRecipe/:id', async (req: Request, res: Response) => {
//   try {
//     const response = await FavoriteController.deleteFavorite(Number(req.params.id));
//     return res.status(200).json(response);
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// });

module.exports = router;
