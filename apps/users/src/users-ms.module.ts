import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoginHistoryModule } from './login-history/login-history.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, LoginHistoryModule, AuthModule],
})
export class UsersMsModule {}
