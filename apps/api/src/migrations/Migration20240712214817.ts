import { Migration } from '@mikro-orm/migrations';

export class Migration20240712214817 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `token` (`id` text not null, `secret` text not null, `user_id` text not null, constraint `token_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade, primary key (`id`));');
    this.addSql('create index `token_user_id_index` on `token` (`user_id`);');
  }

}
