// Interfaces de class
export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface ICountry {
  id: number;
  code: string;
  name: string;
}

export interface IState {
  id: number;
  name: string;
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

export interface IProductCategory {
  id: number;
  categoryName: string;
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

export interface IPurchase {
  customer: ICustomer;
  billingAddress: IAddress;
  shippingAddress: IAddress;
  order: IOrder;
  orderItems: IOrderItem[];
}

export interface ICartItem {
  id: number;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrderHistory {
  id: string;
  orderTrackingNumber: string;
  totalPrice: number;
  totalQuantity: number;
  dateCreated: Date;
}

// Interfaces genéricas
interface IPagination {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

// Interfaces de resposta
export interface IPurchaseResponse {
  orderTrackingNumber: string;
}

export interface IGetResponseOrderHistory {
  _embedded: {
    orders: IOrderHistory[];
  };
}

export interface IGetResponseProducts {
  _embedded: {
    products: IProduct[];
  };
  page: IPagination;
}

export interface IGetResponseProductCategory {
  _embedded: {
    productCategory: IProductCategory[];
  };
}

export interface IGetResponseCountries {
  _embedded: {
    countries: ICountry[];
  };
}

export interface IGetResponseStates {
  _embedded: {
    states: IState[];
  };
}
