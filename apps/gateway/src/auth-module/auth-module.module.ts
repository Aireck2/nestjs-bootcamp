import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModuleController } from './auth-module.controller';

@Module({
  controllers: [AuthModuleController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'USERS_MS',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              port: configService.get('USERS_MS_PORT'),
              host: '0.0.0.0',
            },
          };
        },
      },
    ]),
  ],
})
export class AuthModuleModule {}
