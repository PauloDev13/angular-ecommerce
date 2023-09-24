import { IProductCategory } from './interfaces/interfaces';

export class ProductCategory implements IProductCategory {
  constructor(
    public id: number,
    public categoryName: string,
  ) {}
}
