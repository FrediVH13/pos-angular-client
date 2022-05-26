import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/shared/interfaces/category';
import { Department } from 'src/app/shared/interfaces/department';
import { Product } from 'src/app/shared/interfaces/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  message: string = 'Producto modificado con éxito.';
  imageUrl = 'assets/images/unnamed.png';
  selectedImage: string = '';
  isVisible = false;
  validateForm!: FormGroup;
  formatterDollar = (value: number): string => `$ ${value}`;
  parserDollar = (value: string): string => value.replace('$ ', '');
  departmentList: readonly Department[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((res) => {
      this.departmentList = res;
    });
    if (this.data) {
      const product: Product = this.data;
      this.validateForm = this.fb.group({
        id: [product.id],
        image: [product.image],
        code: [product.code, [Validators.required]],
        name: [product.name, [Validators.required, Validators.maxLength(256)]],
        salePrice: [
          product.salePrice,
          [Validators.min(0), Validators.max(9999)],
        ],
        purchasePrice: [
          product.purchasePrice,
          [Validators.min(0), Validators.max(9999)],
        ],
        wholesalePrice: [
          product.wholesalePrice,
          [Validators.min(0), Validators.max(9999)],
        ],
        unitsInStock: [product.unitsInStock],
        status: [product.status],
        productCategory: [product.productCategory, [Validators.required]],
      });
    } else {
      this.validateForm = this.fb.group({
        id: [null],
        image: [null],
        code: [null, [Validators.required]],
        name: [null, [Validators.required, Validators.maxLength(256)]],
        salePrice: [0, [Validators.min(0), Validators.max(9999)]],
        purchasePrice: [0, [Validators.min(0), Validators.max(9999)]],
        wholesalePrice: [0, [Validators.min(0), Validators.max(9999)]],
        unitsInStock: [0],
        status: ['OUT_OF_STOCK'],
        productCategory: [null, [Validators.required]],
      });
    }
  }

  compareCategories(cat1: Category, cat2: Category) {
    return cat1.id == cat2.id && cat1.name == cat2.name;
  }

  onSelectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      this.selectedImage = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => (this.imageUrl = e.target.result);
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const product = this.validateForm.value;
      if (product.id) {
        this.productService.update(product, product.id).subscribe((res) => {
          this.dialogRef.close();
          this._snackBar.open('Producto modificado exitosamente.', '', {
            duration: 2 * 1000,
          });
        });
      } else {
        this.productService.new(product).subscribe((res) => {
          this.dialogRef.close();
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
