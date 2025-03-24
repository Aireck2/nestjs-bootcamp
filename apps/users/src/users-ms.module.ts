import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoginHistoryEntity } from './login-history/entities/login-history.entity';
import { LoginHistoryModule } from './login-history/login-history.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    LoginHistoryModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, LoginHistoryEntity],
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
export class UsersMsModule {}
