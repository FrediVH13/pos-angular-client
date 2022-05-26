import { PaymentMenthod } from './../../../shared/interfaces/payment-method';
import { CustomersService } from './../../services/customers.service';
import { OrdersService } from './../../services/orders.service';
import { Order } from './../../../shared/interfaces/order';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { OrderLine } from 'src/app/shared/interfaces/order-line';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from '../../services/products.service';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
})
export class OrderFormComponent implements OnInit {
  dataSource: OrderLine[] = [];
  products!: Product[];
  customers!: Customer[];
  paymentMethods!: PaymentMenthod[];
  orderDate = new FormControl(new Date());
  customerSelected = new FormControl();
  paymentMethodSelected = new FormControl();
  orderDateModel: string = '';
  displayedColumns: string[] = [
    'quantity',
    'productName',
    'unitsInStock',
    'unitPrice',
    'subTotal',
    'delete',
  ];

  @ViewChild('productCode') productCode!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<OrderLine>;

  constructor(
    private productService: ProductsService,
    private ordersService: OrdersService,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCustomers();
    this.getPaymentMethods();
  }

  getProducts() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

  getCustomers() {
    this.customersService.getAll().subscribe((res) => {
      this.customers = res;
      this.customerSelected.setValue(res[0]);
    });
  }

  getPaymentMethods() {
    this.customersService.getAllPaymentMethods().subscribe((res) => {
      this.paymentMethods = res;
      this.paymentMethodSelected.setValue(res[0]);
    });
  }

  saveOrder() {
    let order: Order = {
      customer: this.customerSelected.value,
      paymentMethod: this.paymentMethodSelected.value,
      user: null,
      orderDate: this.orderDate.value,
      amountTendered: 456,
      orderLines: this.dataSource,
      totalAmount: this.getTotalCost(),
    };
    this.ordersService.new(order).subscribe((res) => console.log(res));
  }

  addProduct(event: Event) {
    const code = (event.target as HTMLInputElement).value;
    if (code.length >= 10) {
      let b = false;
      this.dataSource.forEach((orderLine, index) => {
        if (orderLine.product.code === code) {
          b = true;
          this.dataSource[index].quantity++;
          this.dataSource[index].subTotal =
            this.dataSource[index].subTotal + this.dataSource[index].unitPrice;
          this.productCode.nativeElement.value = '';
        }
      });
      if (!b) {
        const product = this.products.find((product) => product.code === code);
        if (product) {
          this.dataSource.push({
            product: product,
            unitPrice: product.salePrice,
            quantity: 1,
            subTotal: product.salePrice,
          });
          this.productCode.nativeElement.value = '';
        }
      }
      this.table.renderRows();
    }
  }

  removeOrderLine(orderLine: OrderLine) {
    this.dataSource = this.dataSource.filter(function (value, index, arr) {
      return value != orderLine;
    });
    this.table.renderRows();
  }

  getTotalCost(): number {
    return this.dataSource
      .map((p) => p.subTotal)
      .reduce((acc, value) => acc + value, 0);
  }
}
