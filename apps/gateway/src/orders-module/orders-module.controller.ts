import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateOrderDto } from 'apps/products/src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/products/src/orders/dto/update-order.dto';

@Controller('v1/orders')
export class OrdersModuleController {
  constructor(
    @Inject('PRODUCTS_MS') private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrdersModuleDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrdersModuleDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOrder', { id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrdersModuleDto: UpdateOrderDto,
  ) {
    return this.ordersClient.send('updateOrder', {
      id,
      ...updateOrdersModuleDto,
    });
  }
}
