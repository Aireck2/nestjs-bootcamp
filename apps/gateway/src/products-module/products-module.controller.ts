import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Inject, Query, UsePipes } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateProductDto } from 'apps/products/src/products/dto/create-product.dto';
import { UpdateProductDto } from 'apps/products/src/products/dto/update-product.dto';

@Controller('v1/products')
export class ProductsModuleController {
  constructor(
    @Inject('PRODUCTS_MS') private readonly productClient: ClientProxy,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send('createProduct', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productClient.send('findAllProducts', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productClient.send('findProduct', { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productClient.send('updateProduct', {
      id,
      ...updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productClient.send('removeProduct', { id });
  }
}
