import { Controller, Get, Inject, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TELEGRAM_SERVICE') private telegramClient: ClientProxy,
    @Inject('DISCORD_SERVICE') private discordClient: ClientProxy,
  ) {}

  @Get()
  async testCall(@Body() body: any) {
    this.telegramClient.emit('new_message', { test: 1 });
    this.discordClient.emit('new_message', { test: 1 });
  }
}
