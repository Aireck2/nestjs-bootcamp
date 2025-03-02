import { Module } from "@nestjs/common";
import { AuthMsController } from "./auth-ms.controller";
import { AuthMsService } from "./auth-ms.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt-strategy/jwt-strategy";

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET") || "defaultSecret",
        signOptions: { expiresIn: "120s" },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthMsController],
  providers: [AuthMsService, JwtStrategy],
  exports: [AuthMsService],
})
export class AuthMsModule {}
