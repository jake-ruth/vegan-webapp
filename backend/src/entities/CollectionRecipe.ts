import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Collection } from './Collection';
import { Recipe } from './Recipe';

@Entity('Favorite')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => Collection)
  @JoinColumn()
  collection: Collection;

  @ManyToOne((type) => Recipe, { eager: true, onDelete: 'CASCADE' }) //Need eager to get the full recipe object back
  @JoinColumn()
  recipe: Recipe;
}
