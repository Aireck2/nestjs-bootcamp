import { NestFactory } from '@nestjs/core';
import { UsersMsModule } from './users-ms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const PORT = Number(process.env.USERS_MS_PORT);

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersMsModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: '0.0.0.0',
      },
    },
  );
  await app.listen();
  console.log(`Microservice::Users is listening on ${PORT}`);
}
bootstrap();
