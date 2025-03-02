import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { ConfigModule } from "@nestjs/config";
import { ProductModuleModule } from "./product-module/product-module.module";
import { AuthModuleModule } from "./auth-module/auth-module.module";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        PRODUCTS_MS_PORT: Joi.number().required(),
        AUTH_MS_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    ProductModuleModule,
    AuthModuleModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
