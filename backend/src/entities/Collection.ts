import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, Column } from 'typeorm';
import { ApplicationUser } from './ApplicationUser';

@Entity('Collection')
export class Collection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne((type) => ApplicationUser)
  @JoinColumn()
  applicationUser: ApplicationUser;
}
