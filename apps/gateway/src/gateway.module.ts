import { Module } from '@nestjs/common';
import { ProductsModuleModule } from './products-module/products-module.module';
import { OrdersModuleModule } from './orders-module/orders-module.module';
import { UsersModuleModule } from './users-module/users-module.module';
import { LoginHistoryModuleModule } from './login-history-module/login-history-module.module';
import { AuthModuleModule } from './auth-module/auth-module.module';

@Module({
  imports: [ProductsModuleModule, OrdersModuleModule, UsersModuleModule, LoginHistoryModuleModule, AuthModuleModule],
})
export class GatewayModule {}
