import { ApplicationUser } from './ApplicationUser';
import { Collection } from './Collection';
import { Recipe } from './Recipe';

export interface CollectionRecipe {
  id: number; //PK
  recipe: Recipe;
  collection: Collection;
  applicationUser: ApplicationUser;
}
