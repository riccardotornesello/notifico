import { Migration } from '@mikro-orm/migrations';

export class Migration20240713100736 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `discord_webhook_bot` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null, `token` text not null, `user_id` text not null, constraint `discord_webhook_bot_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade, primary key (`id`));');
    this.addSql('create index `discord_webhook_bot_user_id_index` on `discord_webhook_bot` (`user_id`);');
  }

}
