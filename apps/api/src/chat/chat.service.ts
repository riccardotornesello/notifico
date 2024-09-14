import { Injectable } from '@nestjs/common';
import { ChatDiscordService } from '../chat-discord/chat-discord.service';

@Injectable()
export class ChatService {
  constructor(private readonly discordService: ChatDiscordService) {}

  async sendMessage(message: string, userId: string): Promise<void> {
    await this.discordService.sendMessage(message, userId);
  }
}
