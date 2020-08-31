import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity('ApplicationUser')
export class ApplicationUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Recipe, (recipe) => recipe.applicationUser)
  recipes: Recipe[];
}
