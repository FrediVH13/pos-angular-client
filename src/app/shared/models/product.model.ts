import { Status } from '../enums/status';
import { ProductCategory } from './product-category.model';
import { ProductTags } from './product-tags.model';

export class Product {
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public salePrice: number,
    public purchasePrice: number,
    public wholesalePrice: number,
    public unitsInStock: number,
    public status: Status,
    public productCategory: ProductCategory,
    public productTags?: ProductTags[],
    public image?: string,
  ) {}
}
