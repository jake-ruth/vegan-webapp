import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, Column, ManyToMany } from 'typeorm';
import { ApplicationUser } from './ApplicationUser';
import { CollectionRecipe } from './CollectionRecipe';

@Entity('Collection')
export class Collection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @ManyToOne((type) => ApplicationUser)
  @JoinColumn()
  applicationUser: ApplicationUser;

  @ManyToMany((type) => CollectionRecipe, (collectionRecipe) => collectionRecipe.collection)
  collectionRecipes: CollectionRecipe[];
}
