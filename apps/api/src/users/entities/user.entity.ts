import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '../../common/entities';

@Entity()
export class User extends CustomBaseEntity {
  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;
}
