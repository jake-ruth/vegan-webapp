import { CollectionRecipe } from '../entities/CollectionRecipe';

export class CollectionRecipeController {
  static readCollectionRecipes = async (applicationUserId: number) => {
    const collectionRecipes = await CollectionRecipe.find({ where: { applicationUser: { id: applicationUserId } } });
    return collectionRecipes;
  };

  static readCollectionRecipesByCollection = async (collectionId: number) => {
    const collectionRecipes = await CollectionRecipe.find({ where: { collection: { id: collectionId } } });
    return collectionRecipes;
  };

  static deleteCollectionRecipe = async (id: number) => {
    return await CollectionRecipe.delete(id);
  };
}
