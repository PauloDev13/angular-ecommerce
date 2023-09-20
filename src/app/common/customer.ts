import { ICustomer } from './interfaces/interfaces';

export class Customer implements ICustomer {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;

  constructor(customer: ICustomer) {
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.email = customer.email;
  }
}
