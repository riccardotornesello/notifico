import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDiscordModule } from 'src/chat-discord/chat-discord.module';
import { AuthModule } from 'src/auth/auth.module';
import { ChatController } from './chat.controller';

@Module({
  imports: [ChatDiscordModule, AuthModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
