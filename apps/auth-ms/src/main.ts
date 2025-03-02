import { NestFactory } from "@nestjs/core";
import { AuthMsModule } from "./auth-ms.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthMsModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.AUTH_MS_PORT),
        host: "0.0.0.0",
      },
    }
  );
  await app.listen();
  console.log(
    `Microservice::Auth is listening on ${Number(process.env.AUTH_MS_PORT)}`
  );
}
bootstrap();
