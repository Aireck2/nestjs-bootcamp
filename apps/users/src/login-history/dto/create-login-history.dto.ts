import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLoginHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
