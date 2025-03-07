import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.PRODUCT_MS_PORT) ?? 3001,
        host: "0.0.0.0",
      },
    }
  );
  await app.listen();
  console.log(
    `Microservice::Products is listening on ${Number(process.env.PRODUCT_MS_PORT) ?? 3001}`
  );
}
bootstrap();
