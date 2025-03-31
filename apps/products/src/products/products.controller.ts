import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('findAllProducts')
  findAll(@Payload() paginationDto: PaginationDto & { hasDiscount?: boolean }) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern('findProduct')
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @MessagePattern('updateProduct')
  update(@Payload() payload: UpdateProductDto & { id: string }) {
    const { id, ...updateProductDto } = payload;
    return this.productsService.update(+id, updateProductDto);
  }

  @MessagePattern('removeProduct')
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}
