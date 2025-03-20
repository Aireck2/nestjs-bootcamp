import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('findAllProducts')
  findAll() {
    console.log('Find all controller ms');
    return this.productsService.findAll();
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
