import { Customer } from './customer';
import { OrderLine } from './order-line';

export interface Order {
  id?: number;
  customer: Customer;
  user: any;
  paymentMethod: any;
  totalAmount: number;
  amountTendered: number;
  orderDate: Date;
  orderLines: OrderLine[];
}
