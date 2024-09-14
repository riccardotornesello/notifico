import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO: use constants and types for event names and payloads
  @EventPattern('new_message')
  async newMessage(@Payload() data: any) {
    console.log('new_message', data);
  }
}
