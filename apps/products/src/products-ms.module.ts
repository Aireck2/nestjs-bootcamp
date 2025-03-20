import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'apps/users/src/users/entities/user.entity';
import { OrderEntity } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { ProductEntity } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProductEntity, OrderEntity, UserEntity],
      extra: {
        ssl: true,
      },
      logging: ['query', 'error'],
      synchronize: false, // Set to false in production
      migrations: ['../../../database/migrations/**/*{.ts,.js}'],
      migrationsRun: true, // Automatically run migrations
    }),
  ],
})
export class ProductsMsModule {}
