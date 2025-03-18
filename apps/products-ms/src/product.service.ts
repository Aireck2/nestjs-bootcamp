import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./products/entities/product.entity";
import { BackendListResponse, BackendResponse } from "apps/utils/types";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(): BackendListResponse<ProductEntity[]> {
    const products = await this.productRepository.find({
      take: 30,
      order: {
        id: "DESC",
      },
      relations: {
        category: true,
      },
    });
    const count = await this.productRepository.count();
    return {
      page_info: {
        has_next_page: count > 10,
        has_previous_page: false,
        total: count,
        page: 1,
        per_page: 10,
      },
      data: products,
    };
  }
  async findById(id: number): BackendResponse<ProductEntity> {
    return {
      data: await this.productRepository.findOne({
        where: { id },
        relations: {
          category: true,
        },
      }),
    };
  }
  async createProduct(
    createProductDto: CreateProductDto
  ): BackendResponse<ProductEntity> {
    return {
      data: await this.productRepository.save(createProductDto),
    };
  }
  async updateProduct(
    productId: number,
    product: Omit<ProductEntity, "id">
  ): BackendResponse<ProductEntity> {
    const foundProduct = await this.findById(productId);
    await this.productRepository.update(productId, product);
    return {
      data: {
        id: productId,
        ...foundProduct,
        ...product,
      },
    };
  }
  // async removeProduct(id: number): BackendResponse<ProductEntity> {
  //   const product = await this.findById(id);

  //   await this.productRepository.update(id, { ...product, isActive: false });
  //   return {
  //     data: product,
  //   };
  // }
}
