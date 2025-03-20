import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNumber()
  @IsPositive()
  userId: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  finalPrice: number;
}
