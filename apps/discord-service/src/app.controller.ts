import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  DiscordEvent,
  DiscordNewMessageBody,
} from '@repo/discord-utils/constants';

@Controller()
export class AppController {
  constructor() {}

  @EventPattern(DiscordEvent.NEW_MESSAGE)
  async newMessage(@Payload() data: DiscordNewMessageBody) {
    console.log('new_message', data);
  }
}
