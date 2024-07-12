import { Migration } from '@mikro-orm/migrations';

export class Migration20240625180326 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `username` text not null, `email` text not null, `password` text not null, primary key (`id`));');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');
  }

}
