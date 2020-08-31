import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { ApplicationUser } from './ApplicationUser';

@Entity('Recipe')
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('character varying', { array: true, nullable: true })
  ingredients: string[];

  @Column('character varying', { array: true, nullable: true })
  instructions: string[];

  //Be sure to set eager to true to get back the object from a relation column
  @OneToOne((type) => ApplicationUser, { eager: true })
  @JoinColumn()
  applicationUser: ApplicationUser;
}