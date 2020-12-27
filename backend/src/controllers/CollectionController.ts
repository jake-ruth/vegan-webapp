import { CollectionRecipe } from '../entities/CollectionRecipe';
import { Recipe } from '../entities/Recipe';
import { ApplicationUser } from '../entities/ApplicationUser';
import { Collection } from '../entities/Collection';

export class CollectionController {
  static createCollection = async (title: string, applicationUserId: number) => {
    let collection = new Collection();
    let user = await ApplicationUser.findOne(applicationUserId);

    if (!user) throw new Error('Invalid user id or recipe id');
    collection.applicationUser = user;
    collection.title = title;

    return await Collection.save(collection);
  };

  static readCollections = async (applicationUserId: number) => {
    const collections = await Collection.find({ where: { applicationUser: { id: applicationUserId } } });

    return collections;
  };

  static deleteCollection = async (id: number) => {
    return await Collection.delete(id);
  };

  static addRecipeToCollection = async (recipeId: number, collectionId: number) => {
    let collectionRecipe = new CollectionRecipe();
    let recipe = await Recipe.findOne(recipeId);
    const collection = await Collection.findOne(collectionId);
    if (recipe) collectionRecipe.recipe = recipe;
    if (collection) collectionRecipe.collection = collection;

    return await CollectionRecipe.save(collectionRecipe);
  };
}
