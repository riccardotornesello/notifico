import { Body, Controller, Post, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Auth } from '../auth/decorators/auth';
import { SendMessageDto } from './dto/send.message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Auth()
  @Post('send')
  async sendMessage(@Req() req: any, @Body() sendMessageDto: SendMessageDto) {
    await this.chatService.sendMessage(sendMessageDto.message, req.user.id);
  }
}
