import { ICustomer } from './interfaces/interfaces';

export class Customer {
  firstName: string;
  lastName: string;
  email: string;

  constructor(customer: ICustomer) {
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.email = customer.email;
  }
}
