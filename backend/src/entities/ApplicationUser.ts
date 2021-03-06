import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Generated } from 'typeorm';
import { CollectionRecipe } from './CollectionRecipe';
import { Favorite } from './Favorite';
import { Recipe } from './Recipe';

@Entity('ApplicationUser')
export class ApplicationUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  bio: string;

  @Column()
  @Generated('uuid')
  uuid: string;

  @OneToMany(() => Recipe, (recipe) => recipe.applicationUser)
  recipes: Recipe[];

  @OneToMany(() => CollectionRecipe, (collectionRecipe) => collectionRecipe.applicationUser)
  collectionRecipes: CollectionRecipe[];

  @OneToMany(() => Favorite, (favorite) => favorite.applicationUser)
  favorites: Favorite[];
}
