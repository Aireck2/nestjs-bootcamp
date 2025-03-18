import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { ConfigService } from "@nestjs/config";
import { PreInterceptor } from "./interceptor/pre-interceptor";
import { VerifyGuard } from "./guards/verify.guard";
import { TransformPipe } from "./pipes/transform.pipe";
import { PostInterceptor } from "./interceptor/post.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("APP_PORT");
  app.setGlobalPrefix("api");
  app.useGlobalGuards(new VerifyGuard());
  // app.useGlobalInterceptors(new PreInterceptor());
  // app.useGlobalInterceptors(new PostInterceptor());
  // app.useGlobalPipes(new TransformPipe());
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
