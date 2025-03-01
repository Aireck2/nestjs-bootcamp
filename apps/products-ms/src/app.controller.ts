import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Product } from "../../utils/types";
import { AppService } from "./app.service";

@Controller("v1/products")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("getProducts")
  async getProducts(): Promise<Product[]> {
    return await this.appService.getAllProducts();
  }

  @MessagePattern("getProductById")
  getProductById(
    @Payload()
    idProducto: string
  ): Product {
    try {
      return this.appService.findProductById(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("createProduct")
  createProduct(
    @Payload()
    newProductoBody: Product
  ): Product {
    return this.appService.createProduct(newProductoBody);
  }

  @MessagePattern("updateProduct")
  updateProduct(
    @Payload()
    valoresUpdate: any
  ): Product {
    try {
      const { idProducto, newProductoBody } = valoresUpdate;
      return this.appService.updateProduct(idProducto, newProductoBody);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("removeProduct")
  removeProduct(
    @Payload()
    idProducto: string
  ) {
    try {
      return this.appService.deleteProduct(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }
}
