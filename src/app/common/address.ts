import { IAddress } from './interfaces/interfaces';

export class Address implements IAddress {
  readonly country: string;
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;

  constructor(address: IAddress) {
    this.street = address.street;
    this.city = address.city;
    this.state = address.state;
    this.country = address.country;
    this.zipCode = address.zipCode;
  }
}
