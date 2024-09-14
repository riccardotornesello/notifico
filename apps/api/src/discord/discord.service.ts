import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, Reference } from '@mikro-orm/core';
import { DiscordWebhookBot } from './entities/discord-webhook-bot.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DiscordService {
  constructor(
    @Inject('DISCORD_SERVICE')
    private client: ClientProxy,
    @InjectRepository(DiscordWebhookBot)
    private readonly discordWebhookBotRepository: EntityRepository<DiscordWebhookBot>,
  ) {}

  async getUserBots(userId: string): Promise<DiscordWebhookBot[]> {
    return this.discordWebhookBotRepository.find({ user: userId });
  }

  async registerUserBot(
    userId: string,
    name: string,
    token: string,
  ): Promise<DiscordWebhookBot> {
    const bot = this.discordWebhookBotRepository.create({
      name,
      token,
      user: Reference.createFromPK(User, userId),
    });

    return this.discordWebhookBotRepository.insert(bot);
  }

  async sendMessage(message: string, userId: string): Promise<void> {
    const bots = await this.getUserBots(userId);
    for (const bot of bots) {
      this.client.emit('new_message', { message, token: bot.token });
    }
  }
}
