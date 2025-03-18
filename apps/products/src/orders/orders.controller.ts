import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('create')
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAll')
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOne')
  findOne(@Payload('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @MessagePattern('update')
  update(@Payload() payload: UpdateOrderDto & { id: string }) {
    const { id, ...updateOrderDto } = payload;
    return this.ordersService.update(+id, updateOrderDto);
  }

  @MessagePattern('remove')
  remove(@Payload('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
