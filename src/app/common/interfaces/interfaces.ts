export interface IPurchase {
  customer: ICustomer;
  billingAddress: IAddress;
  shippingAddress: IAddress;
  order: IOrder;
  orderItems: IOrderItem[];
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IOrder {
  totalQuantity: number;
  totalPrice: number;
}

export interface IOrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}