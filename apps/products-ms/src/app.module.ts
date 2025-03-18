import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { CategoriesModule } from "./categories/categories.module";
import { CuponsModule } from "./cupons/cupons.module";
import { ProductService } from "./product.service";

import { CouponEntity } from "./cupons/entities/cupon.entity";
import { ProductEntity } from "./products/entities/product.entity";
import { CategoryEntity } from "./categories/entities/category.entity";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: Number(configService.get("POSTGRES_PORT")),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DATABASE"),
        entities: [ProductEntity, CategoryEntity, CouponEntity],
        logging: ["query", "error"],
        synchronize: false, // Set to false in production
        migrations: ["../../../database/migrations/**/*{.ts,.js}"],
        migrationsRun: true, // Automatically run migrations
      }),
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, CouponEntity]),
    CategoriesModule,
    CuponsModule,
  ],
  controllers: [AppController],
  providers: [ProductService],
})
export class AppModule {}
