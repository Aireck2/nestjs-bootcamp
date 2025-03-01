import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ErrorResponse, Product } from "apps/utils/types";
import { lastValueFrom } from "rxjs";

@Controller("v1/products")
export class ProductController {
  constructor(
    @Inject("PRODUCTS_SERVICE")
    private readonly productClient: ClientProxy
  ) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return await lastValueFrom(this.productClient.send("getProducts", {}));
  }
  @Get(":productId")
  async getProductById(
    @Param("productId")
    idProducto: string
  ): Promise<Product | ErrorResponse> {
    try {
      return await lastValueFrom(
        this.productClient.send("getProductById", idProducto)
      );
    } catch (error) {
      console.error("error:", error);
      const responseError: ErrorResponse = {
        statusCode: 404,
        message: "Product not found",
      };
      return responseError;
    }
  }

  @Post()
  async createProduct(
    @Body()
    newProductoBody: Product
  ): Promise<Product> {
    return await lastValueFrom(
      this.productClient.send("createProduct", newProductoBody)
    );
  }

  @Put(":productId")
  async updateProduct(
    @Param("productId")
    productId: string,
    @Body()
    newProductoBody: Product
  ): Promise<Product> {
    try {
      return await lastValueFrom(
        this.productClient.send("updateProduct", {
          productId,
          newProductoBody,
        })
      );
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @Delete(":productId")
  async removeProduct(
    @Param("productId")
    productId: string
  ): Promise<string> {
    return await lastValueFrom(
      this.productClient.send("removeProduct", productId)
    );
  }
}
