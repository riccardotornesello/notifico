import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule {}
