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

export interface IProduct {
  id: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active?: boolean;
  unitsInStock?: number;
  dateCreated?: Date;
  lastUpdated?: Date;
}

export interface IPurchaseResponse {
  orderTrackingNumber: string;
}

export interface IOrderHistory {
  id: string;
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  dateCreated: Date;
}

export interface IGetResponseOrderHistory {
  _embedded: {
    orders: IOrderHistory[];
  };
}
