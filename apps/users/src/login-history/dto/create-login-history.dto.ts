import { IsNumber } from 'class-validator';

export class CreateLoginHistoryDto {
  @IsNumber()
  userId: number;
}
