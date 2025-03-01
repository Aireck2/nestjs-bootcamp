import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { ProductModuleModule } from "./product-module/product-module.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   APP_PORT: Joi.number().default(3000),
      //   DATABASE_USER: Joi.string().required(),
      //   DATABASE_PASSWORD: Joi.string().required(),
      // }),
    }),
    ProductModuleModule,
    AuthModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
