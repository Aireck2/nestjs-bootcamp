import { Product } from "./utils/types";
export declare class AppService {
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imgUrl: string;
        hasDiscount: boolean;
        discount: number;
        priceWithDiscount: number;
    }[];
    getAllProducts(): Product[];
    findProductById(id: string): Product;
    createProduct(product: Product): Product;
    updateProduct(id: string, newProduct: Product): Product;
    deleteProduct(id: string): Product;
}
