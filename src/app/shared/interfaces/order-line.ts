import { Product } from 'src/app/shared/interfaces/product';

export interface OrderLine {
  product: Product;
  unitPrice: number;
  quantity: number;
  subTotal: number;
}
