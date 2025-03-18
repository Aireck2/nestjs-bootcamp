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

export type BackendListResponse<T> = Promise<Response<T>>;
export type BackendResponse<T> = Promise<{ data: T }>;
export interface Response<T> {
  data: T;
  page_info: {
    has_next_page: boolean;
    has_previous_page: boolean;
    total: number;
    page: number;
    per_page: number;
  };
}
