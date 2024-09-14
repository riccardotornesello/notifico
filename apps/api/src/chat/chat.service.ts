import { Injectable } from '@nestjs/common';
import { DiscordService } from '../discord/discord.service';

@Injectable()
export class ChatService {
  constructor(private readonly discordService: DiscordService) {}

  async sendMessage(message: string, userId: string): Promise<void> {
    await this.discordService.sendMessage(message, userId);
  }
}
