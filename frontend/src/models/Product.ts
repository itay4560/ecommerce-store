import ProductCategory from "./ProductCategory";

export interface Product {
  productId: number;
  producTitle: string;
  producDescription: string;
  producPrice: number;
  producImage: string;
  productCategory: ProductCategory;
}
