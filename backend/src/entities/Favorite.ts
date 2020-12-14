import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ApplicationUser } from './ApplicationUser';
import { Recipe } from './Recipe';

@Entity('Favorite')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ApplicationUser)
  @JoinColumn()
  applicationUser: ApplicationUser;

  @ManyToOne((type) => Recipe, { eager: true, onDelete: 'CASCADE' }) //Need eager to get the full recipe object back
  @JoinColumn()
  recipe: Recipe;
}
