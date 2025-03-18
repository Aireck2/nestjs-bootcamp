import { Module } from '@nestjs/common';
import { OrdersModuleController } from './orders-module.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersModuleController],
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCTS_MS',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              port: configService.get('PRODUCTS_MS_PORT'),
              host: '0.0.0.0',
            },
          };
        },
      },
    ]),
  ],
})
export class OrdersModuleModule {}
