import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";

import { JwtStrategy } from "apps/auth-ms/src/jwt-strategy/jwt-strategy";
import { AuthModuleController } from "./auth-module.controller";

@Module({
  controllers: [AuthModuleController],
  imports: [
    ConfigModule,
    PassportModule,
    ClientsModule.registerAsync([
      {
        name: "AUTH_SERVICE",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: "localhost",
            port: configService.get("AUTH_MS_PORT"),
          },
        }),
      },
    ]),
  ],
  providers: [JwtStrategy],
})
export class AuthModuleModule {}
