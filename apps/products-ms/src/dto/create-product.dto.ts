import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  img_url: string;
  has_discount: boolean;
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
