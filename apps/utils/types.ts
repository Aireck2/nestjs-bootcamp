export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  hasDiscount: boolean;
  discount: number;
  priceWithDiscount: number;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};