import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductService } from "./product.service";
import { ProductEntity } from "./products/entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("v1/products")
export class AppController {
  constructor(private readonly productsService: ProductService) {}

  @MessagePattern("getProducts")
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern("getProductById")
  getProductById(@Payload() productId: number) {
    try {
      return this.productsService.findById(Number(productId));
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern("createProduct")
  createProduct(
    @Payload()
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.createProduct(createProductDto);
  }

  @MessagePattern("updateProduct")
  updateProduct(
    @Payload()
    updateProductDto: ProductEntity,
  ) {
    try {
      const { id, ...newProduct } = updateProductDto;
      return this.productsService.updateProduct(Number(id), newProduct);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("removeProduct")
  removeProduct(
    @Payload()
    idProducto: string,
  ) {
    try {
      // return this.productsService.removeProduct(idProducto);
      return {};
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }
}
