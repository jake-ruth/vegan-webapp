import { ApplicationUser } from '../entities/ApplicationUser';
import { Favorite } from '../entities/Favorite';
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

  static deleteFavorite = async (id: number) => {
    return await Favorite.delete(id);
  };
}
