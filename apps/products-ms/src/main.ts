import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const PORT = 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: PORT,
        host: "0.0.0.0",
      },
    }
  );
  await app.listen();
  console.log(`Microservice::Products is listening on ${PORT}`);
  // app.enableCors();
  // app.setGlobalPrefix("api");
  // await app.listen(3000);
}
bootstrap();
