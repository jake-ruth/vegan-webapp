import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApplicationUser } from './ApplicationUser';
import { Collection } from './Collection';
import { Recipe } from './Recipe';

@Entity('CollectionRecipe')
export class CollectionRecipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ApplicationUser, { eager: true })
  @JoinColumn()
  applicationUser: ApplicationUser;

  @ManyToOne((type) => Collection, { eager: true })
  @JoinColumn()
  collection: Collection;

  @ManyToOne((type) => Recipe, { eager: true, onDelete: 'CASCADE' }) //Need eager to get the full recipe object back
  @JoinColumn()
  recipe: Recipe;
}
