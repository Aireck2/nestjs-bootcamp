import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PER_PAGE } from 'apps/common/constants';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { getPageInfo } from 'apps/common/utils';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

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

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, per_page = PER_PAGE } = paginationDto;

    const [data, total] = await this.productRepository.findAndCount({
      take: per_page,
      skip: (page - 1) * per_page,
    });

    const pageInfo = getPageInfo(total, page, per_page);

    return { pageInfo, data };
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
