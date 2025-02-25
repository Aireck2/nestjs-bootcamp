import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Product } from "./utils/types";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, Observable } from "rxjs";
import { AxiosResponse } from "axios";

@Controller("v1/products")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get("")
  async getProducts(): Promise<AxiosResponse<any[]>> {
    // const observableRequest = this.httpService.get(
    //   "https://fakestoreapi.com/products"
    // );
    // const response = await firstValueFrom(observableRequest);

    // return response.data;
    const { data } = await firstValueFrom(
      this.httpService.get("https://fakestoreapi.com/products")
    );
    return data;
  }

  @Get(":productId")
  getProductById(@Param("productId") productId: string): Product | {} {
    return this.appService.findProductById(productId);
  }
  @Post("")
  createProduct(@Body() newProduct: Product): Product {
    return this.appService.createProduct(newProduct);
  }
  @Put(":productId")
  updateProduct(
    @Param("productId") productId: string,
    @Body() newProduct: Product
  ): Product {
    return this.appService.updateProduct(productId, newProduct);
  }
  @Delete(":productId")
  deleteProduct(@Param("productId") productId: string): Product {
    return this.appService.deleteProduct(productId);
  }
}
