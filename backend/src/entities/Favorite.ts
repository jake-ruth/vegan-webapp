import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Generated, OneToOne, JoinColumn } from 'typeorm';
import { ApplicationUser } from './ApplicationUser';
import { Recipe } from './Recipe';

@Entity('Favorite')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => ApplicationUser)
  @JoinColumn()
  applicationUser: ApplicationUser;

  @OneToOne((type) => Recipe)
  @JoinColumn()
  recipe: Recipe;
}
