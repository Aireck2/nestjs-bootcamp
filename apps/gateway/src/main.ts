import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

const PORT = Number(process.env.GATEWAY_PORT);
async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  console.log(`Gateaway is listening on ${PORT}`);
}
bootstrap();
