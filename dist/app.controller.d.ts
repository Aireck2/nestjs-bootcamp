import { AppService } from "./app.service";
import { Product } from "./utils/types";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
export declare class AppController {
    private readonly appService;
    private readonly httpService;
    constructor(appService: AppService, httpService: HttpService);
    getProducts(): Promise<AxiosResponse<any[]>>;
    getProductById(productId: string): Product | {};
    createProduct(newProduct: Product): Product;
    updateProduct(productId: string, newProduct: Product): Product;
    deleteProduct(productId: string): Product;
}
