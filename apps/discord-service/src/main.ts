import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    // {
    //   transport: Transport.KAFKA,
    //   options: {
    //     client: {
    //       brokers: ['localhost:9092'],
    //     },
    //   },
    // },
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'discord',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
