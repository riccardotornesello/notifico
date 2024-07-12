import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Token } from './entities/token.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Token] }), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
