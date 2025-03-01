import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { ValidationPipe } from "@nestjs/common";
import { ExampleGuard } from "./example/example.guard";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const PORT = 3000;
  app.setGlobalPrefix("api");
  await app.listen(process.env.port ?? PORT);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // quitar propiedades que no estén en el DTO
  //     //forbidNonWhitelisted: true, // lanzar error si hay propiedades no permitidas
  //     transform: true, // transformar los datos de entrada a su tipo correcto
  //   })
  // );
  app.useGlobalGuards(new ExampleGuard());
  console.log(`Gateway is listening on ${await app.getUrl()}`);
}
bootstrap();
