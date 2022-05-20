import { Category } from "./category";

export interface Product {
  id: number;
  image: string;
  code: string;
  name: string;
  salePrice: number;
  purchasePrice: number;
  wholesalePrice: number;
  unitsInStock: number;
  status: string;
  productCategory: Category;
}
