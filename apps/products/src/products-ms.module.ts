import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { ProductEntity } from './products/entities/product.entity';

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
      entities: [ProductEntity],
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
