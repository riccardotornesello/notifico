import { v4 } from 'uuid';
import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class CustomBaseEntity {
  @PrimaryKey()
  uuid = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
