import { Module } from '@nestjs/common';
import { ProductsModuleModule } from './products-module/products-module.module';

@Module({
  imports: [ProductsModuleModule],
})
export class GatewayModule {}
