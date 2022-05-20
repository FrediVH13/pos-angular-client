import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from '../../services/products.service';

export interface OrderLine {
  productId: number;
  productCode: string;
  productName: string;
  unitsInStock: number;
  unitPrice: number;
  quantity: number;
  subTotal: number;
}

export const DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
})
export class OrderFormComponent implements OnInit {
  orderDate = new FormControl(new Date());
  displayedColumns: string[] = [
    'quantity',
    'productName',
    'unitsInStock',
    'unitPrice',
    'subTotal',
    'delete',
  ];
  dataSource: OrderLine[] = [];
  products!: Product[];
  @ViewChild('productCode') productCode!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<OrderLine>;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

  addProduct(event: Event) {
    const code = (event.target as HTMLInputElement).value;
    if (code.length >= 10) {
      let b = false;
      this.dataSource.forEach((orderLine, index) => {
        if (orderLine.productCode === code) {
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
            productId: product.id,
            productCode: product.code,
            productName: product.name,
            unitsInStock: product.unitsInStock,
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

  getTotalCost() {
    return this.dataSource
      .map((p) => p.subTotal)
      .reduce((acc, value) => acc + value, 0);
  }
}
