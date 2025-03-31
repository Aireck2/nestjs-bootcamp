import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Inject, Query } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { CreateProductDto } from 'apps/products/src/products/dto/create-product.dto';
import { UpdateProductDto } from 'apps/products/src/products/dto/update-product.dto';

@ApiTags('Products')
@Controller('v1/products')
export class ProductsModuleController {
  constructor(
    @Inject('PRODUCTS_MS') private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send('createProduct', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto & { has_discount?: string }) {
    const discountFilter =
      paginationDto.has_discount === 'true'
        ? true
        : paginationDto.has_discount === 'false'
          ? false
          : undefined;
    return this.productClient.send('findAllProducts', {
      ...paginationDto,
      hasDiscount: discountFilter,
    });
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
