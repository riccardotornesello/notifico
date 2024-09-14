import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DiscordModule } from 'src/discord/discord.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [DiscordModule, AuthModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
