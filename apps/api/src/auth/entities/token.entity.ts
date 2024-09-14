import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

// TODO: periodically clean up expired tokens

@Entity()
export class Token {
  @PrimaryKey()
  id: string;

  @Property()
  secret: string;

  @ManyToOne()
  user: User;

  @Property()
  createdAt = new Date();

  @Property()
  expiresAt: Date;
}
