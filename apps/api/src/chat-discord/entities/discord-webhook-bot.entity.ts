import { Entity, Property, ManyToOne, Ref } from '@mikro-orm/core';
import { CustomBaseEntity } from '../../common/entities';
import { User } from '../../users/entities/user.entity';

@Entity()
export class DiscordWebhookBot extends CustomBaseEntity {
  @Property()
  name: string;

  @Property()
  token: string;

  @ManyToOne(() => User, { ref: true })
  user: Ref<User>;
}
