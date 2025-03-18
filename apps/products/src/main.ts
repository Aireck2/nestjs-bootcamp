import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductsMsModule } from './products-ms.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsMsModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.PRODUCTS_MS_PORT),
        host: '0.0.0.0',
      },
    },
  );
  await app.listen();
  console.log(
    `Microservice::Products is listening on ${Number(process.env.PRODUCTS_MS_PORT)}`,
  );
}
bootstrap();
