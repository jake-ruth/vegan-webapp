import { CollectionRecipe } from '../entities/CollectionRecipe';

export class CollectionRecipeController {
  static readCollectionRecipes = async (applicationUserId: number) => {
    const collections = await CollectionRecipe.find({ where: { applicationUser: { id: applicationUserId } } });

    console.log('COLL: ', collections);

    return collections;
  };

  static deleteCollectionRecipe = async (id: number) => {
    return await CollectionRecipe.delete(id);
  };
}
