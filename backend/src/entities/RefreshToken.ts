import { Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity('RefreshToken')
export class RefreshToken extends BaseEntity {
  @PrimaryColumn()
  refreshToken: string;
}