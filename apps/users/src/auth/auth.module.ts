import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHistoryEntity } from '../login-history/entities/login-history.entity';
import { LoginHistoryModule } from '../login-history/login-history.module';
import { LoginHistoryService } from '../login-history/login-history.service';
import { UserEntity } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, LoginHistoryEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    LoginHistoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginHistoryService],
})
export class AuthModule {}
