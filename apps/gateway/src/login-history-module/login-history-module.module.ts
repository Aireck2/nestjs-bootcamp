import { Module } from '@nestjs/common';
import { LoginHistoryModuleController } from './login-history-module.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [LoginHistoryModuleController],
  imports: [
    ConfigModule,
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
export class LoginHistoryModuleModule {}
