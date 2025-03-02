import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("APP_PORT");
  app.setGlobalPrefix("api");
  await app.listen(PORT);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // quitar propiedades que no estén en el DTO
  //     //forbidNonWhitelisted: true, // lanzar error si hay propiedades no permitidas
  //     transform: true, // transformar los datos de entrada a su tipo correcto
  //   })
  // );
  console.log(`Gateway is listening on ${await app.getUrl()}`);
}
bootstrap();
