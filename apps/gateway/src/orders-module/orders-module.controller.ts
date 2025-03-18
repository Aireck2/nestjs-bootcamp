import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'apps/products/src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/products/src/orders/dto/update-order.dto';

@Controller('v1/orders')
export class OrdersModuleController {
  constructor(
    @Inject('PRODUCTS_MS') private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrdersModuleDto: CreateOrderDto) {
    return this.ordersClient.send('create', createOrdersModuleDto);
  }

  @Get()
  findAll() {
    return this.ordersClient.send('findAll', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOne', { id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrdersModuleDto: UpdateOrderDto,
  ) {
    return this.ordersClient.send('update', { id, ...updateOrdersModuleDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersClient.send('remove', { id });
  }
}
