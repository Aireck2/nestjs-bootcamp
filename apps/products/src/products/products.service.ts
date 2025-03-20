import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return {
      data: await this.productRepository.save(createProductDto),
    };
  }

  async findAll() {
    return { data: await this.productRepository.find() };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return {
      data: product,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product.data, updateProductDto);
    return {
      data: await this.productRepository.save(product.data),
    };
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    Object.assign(product.data, { isActive: false });

    return {
      data: await this.productRepository.save(product.data),
    };
  }
}
