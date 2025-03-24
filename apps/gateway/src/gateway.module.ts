import { Module } from '@nestjs/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { LoginHistoryModuleModule } from './login-history-module/login-history-module.module';
import { OrdersModuleModule } from './orders-module/orders-module.module';
import { ProductsModuleModule } from './products-module/products-module.module';
import { UsersModuleModule } from './users-module/users-module.module';

@Module({
  imports: [
    ProductsModuleModule,
    OrdersModuleModule,
    UsersModuleModule,
    LoginHistoryModuleModule,
    AuthModuleModule,
  ],
})
export class GatewayModule {}
