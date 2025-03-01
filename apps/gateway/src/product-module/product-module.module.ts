import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [ProductController],
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: "PRODUCTS_SERVICE",
        imports: [ConfigModule],
        inject: [ConfigService],

        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: "localhost",
            port: 3001,
          },
        }),
      },
    ]),
  ],
})
export class ProductModuleModule {}
