import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Token {
  // TODO: expiration date

  @PrimaryKey()
  id: string;

  @Property()
  secret: string;

  @ManyToOne()
  user: User;
}
