import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isLoading = true;
  product: Product[] = [];
  displayedColumns: string[] = [
    'code',
    'name',
    'salePrice',
    'unitsInStock',
    'productCategory',
    'actions',
  ];
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  openDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      disableClose: true,
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProducts() {
    this.productService.getAll().subscribe((res) => {
      this.isLoading = false;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
