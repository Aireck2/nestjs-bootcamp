import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../../utils/types";

@Injectable()
export class AppService {
  products = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 100,
      stock: 10,
      imgUrl: "https://m.media-amazon.com/images/I/61lKQWyMdDL._AC_SL1500_.jpg",
      hasDiscount: true,
      discount: 10,
      priceWithDiscount: 90,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: 200,
      stock: 20,
      imgUrl: "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
      hasDiscount: false,
      discount: 0,
      priceWithDiscount: 200,
    },
  ];

  getAllProducts(): Product[] {
    return this.products;
  }
  findProductById(id: string): Product {
    const product = this.products.find((product) => product.id === +id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }
  createProduct(product: Product): Product {
    const ramdomId = Math.floor(Math.random() * 1000);
    if (product.hasDiscount) {
      product.priceWithDiscount =
        product.price - product.price * product.discount;
    } else {
      product.priceWithDiscount = product.price;
    }

    product.id = ramdomId;
    this.products.push(product);
    return product;
  }
  updateProduct(id: string, newProduct: Product): Product {
    const product = this.products.find((product) => product.id === +id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (product.hasDiscount) {
      product.priceWithDiscount =
        newProduct.price - newProduct.price * newProduct.discount;
    } else {
      product.priceWithDiscount = newProduct.price;
    }
    const updatedProduct = { ...product, ...newProduct };
    Object.assign(product, updatedProduct);
    return updatedProduct;
  }
  deleteProduct(id: string): Product {
    const product = this.products.find((product) => product.id === +id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products = this.products.filter((product) => product.id !== +id);
    return product;
  }
}
