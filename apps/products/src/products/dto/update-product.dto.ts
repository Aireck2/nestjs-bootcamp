import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  hasDiscount?: boolean;

  @IsOptional()
  @IsNumber()
  percentageDiscount?: number;

  @IsOptional()
  @IsArray()
  images?: string[];
}
