import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from 'apps/products/src/products/dto/create-product.dto';
import { UpdateProductDto } from 'apps/products/src/products/dto/update-product.dto';

@Controller('v1/products')
export class ProductsModuleController {
  constructor(
    @Inject('PRODUCTS_MS') private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send('create', createProductDto);
  }

  @Get()
  findAll() {
    console.log('controller');
    return this.productClient.send('findAll', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productClient.send('findOne', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productClient.send('update', { id, ...updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productClient.send('remove', { id });
  }
}
