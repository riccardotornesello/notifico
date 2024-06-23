import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'TELEGRAM_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'hero',
      //       brokers: ['localhost:9092'],
      //     },
      //   },
      // },
      {
        name: 'TELEGRAM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'telegram',
          queueOptions: {
            durable: false,
          },
        },
      },
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
