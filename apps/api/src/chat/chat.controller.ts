import { Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth } from '../auth/decorators/auth';
import { DiscordService } from '../discord/discord.service';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly discordService: DiscordService,
  ) {}

  @Auth()
  @Post('send')
  async sendMessage(): Promise<void> {
    // TODO: get from body
    const message = 'asdasdasd';
    const userId = '9795eb0a-9d52-46bc-95d0-854f0351a14b';

    await this.chatService.sendMessage(message, userId);
  }
}
