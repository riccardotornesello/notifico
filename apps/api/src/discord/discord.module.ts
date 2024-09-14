import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DiscordService } from './discord.service';
import { DiscordWebhookBot } from './entities/discord-webhook-bot.entity';

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
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
