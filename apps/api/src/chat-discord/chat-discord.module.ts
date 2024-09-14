import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChatDiscordService } from './chat-discord.service';
import { DiscordWebhookBot } from './entities/discord-webhook-bot.entity';

// TODO: variable service configuration

@Module({
  imports: [
    MikroOrmModule.forFeature([DiscordWebhookBot]),
    ClientsModule.register([
      {
        name: 'DISCORD_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'discord',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [ChatDiscordService],
  exports: [ChatDiscordService],
})
export class ChatDiscordModule {}
