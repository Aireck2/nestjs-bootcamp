"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.products = [
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
    }
    getAllProducts() {
        return this.products;
    }
    findProductById(id) {
        const product = this.products.find((product) => product.id === +id);
        if (!product)
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        return product;
    }
    createProduct(product) {
        const ramdomId = Math.floor(Math.random() * 1000);
        if (product.hasDiscount) {
            product.priceWithDiscount =
                product.price - product.price * product.discount;
        }
        else {
            product.priceWithDiscount = product.price;
        }
        product.id = ramdomId;
        this.products.push(product);
        return product;
    }
    updateProduct(id, newProduct) {
        const product = this.products.find((product) => product.id === +id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        if (product.hasDiscount) {
            product.priceWithDiscount =
                newProduct.price - newProduct.price * newProduct.discount;
        }
        else {
            product.priceWithDiscount = newProduct.price;
        }
        const updatedProduct = { ...product, ...newProduct };
        Object.assign(product, updatedProduct);
        return updatedProduct;
    }
    deleteProduct(id) {
        const product = this.products.find((product) => product.id === +id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        this.products = this.products.filter((product) => product.id !== +id);
        return product;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map