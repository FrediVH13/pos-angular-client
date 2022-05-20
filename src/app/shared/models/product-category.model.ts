import { ProductDepartment } from './product-department.model';

export class ProductCategory {
  constructor(
    public id: number,
    public name: string,
    public productDepartment: ProductDepartment
  ) {}
}
