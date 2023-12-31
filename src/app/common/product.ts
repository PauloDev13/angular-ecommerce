import { IProduct } from './interfaces/interfaces';

export class Product implements IProduct {
  constructor(
    public id: number,
    public sku: string,
    public name: string,
    public description: string,
    public unitPrice: number,
    public imageUrl: string,
    public active?: boolean,
    public unitsInStock?: number,
    public dateCreated?: Date,
    public lastUpdated?: Date,
  ) {}
}
