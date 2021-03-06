import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  Generated,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ApplicationUser } from './ApplicationUser';
import { CollectionRecipe } from './CollectionRecipe';
import { Favorite } from './Favorite';

@Entity('Recipe')
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column('character varying', { array: true, nullable: true })
  instructions: string[];

  @Column('character varying', { array: true, nullable: true })
  ingredients: string[];

  @Column({ nullable: true })
  prepMinutes: string;

  @Column({ nullable: true })
  cookMinutes: string;

  @Column({ nullable: true })
  yieldAmount: string;

  @Column()
  @Generated('uuid')
  imageUrlUuid: string;

  @Column({ nullable: true })
  imageExtension: string;

  @CreateDateColumn()
  createdDate: Date;

  //Be sure to set eager to true to get back the object from a relation column
  @ManyToOne((type) => ApplicationUser, { eager: true })
  @JoinColumn()
  applicationUser: ApplicationUser;

  @OneToMany((type) => Favorite, (favorite) => favorite.recipe)
  favorites: Favorite[];

  @OneToMany((type) => CollectionRecipe, (collectionRecipe) => collectionRecipe.recipe)
  collectionRecipes: CollectionRecipe[];
}
