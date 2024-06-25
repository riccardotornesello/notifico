import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TELEGRAM_SERVICE') private telegramClient: ClientProxy,
    @Inject('DISCORD_SERVICE') private discordClient: ClientProxy,
  ) {}

  @Get()
  async testCall() {
    this.telegramClient.emit('new_message', { test: 1 });
    this.discordClient.emit('new_message', { test: 1 });
  }
}
