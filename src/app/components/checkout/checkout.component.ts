import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Address } from '../../common/address';
import { Country } from '../../common/country';
import { Customer } from '../../common/customer';
import {
  IAddress,
  ICustomer,
  IOrder,
  IPurchase,
} from '../../common/interfaces/interfaces';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { Purchase } from '../../common/purchase';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Luv2ShopValidators } from '../../validators/luv2-shop.validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice = 0.0;
  totalQuantity = 0;

  startMonth = new Date().getMonth() + 1;
  checkoutFormGroup!: FormGroup;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];

  shippingAddressState: State[] = [];
  billingAddressState: State[] = [];
  theChecked = false;

  testOrderItem!: OrderItem;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly cartService: CartService = inject(CartService);
  private readonly checkoutService: CheckoutService = inject(CheckoutService);
  private readonly router: Router = inject(Router);
  private readonly luv2ShopService: Luv2ShopFormService =
    inject(Luv2ShopFormService);

  // formGroup cliente
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  // formGroup endereço cobrança
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingStateAddress() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  // formGroup endereço entrega
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingStateAddress() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  // formGroup cartão de crédito
  get cardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get nameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get cardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get securityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  get expirationMonth() {
    return this.checkoutFormGroup.get('creditCard.expirationMonth');
  }

  get expirationYear() {
    return this.checkoutFormGroup.get('creditCard.expirationYear');
  }

  ngOnInit() {
    this.getCreditCardYears();
    this.getCreditCardMonths(this.startMonth);
    this.getCountries();
    this.reviewCartDetail();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
      }),
      shippingAddress: this.formBuilder.group({
        country: ['', [Validators.required]],
        street: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: [
          '',
          [Validators.required, Luv2ShopValidators.notOnlyWhitespace],
        ],
      }),
      billingAddress: this.formBuilder.group({
        country: ['', [Validators.required]],
        street: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', Validators.required],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        cardNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{16}'),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        securityCode: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{3}'),
            Luv2ShopValidators.notOnlyWhitespace,
          ],
        ],
        expirationMonth: ['', [Validators.required]],
        expirationYear: ['', [Validators.required]],
      }),
    });
  }

  onSubmit() {
    // O formulário for inválido, mostra mensagens de validação e pára o fluxo
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    // set ordem de compra
    const order: IOrder = new Order(this.totalPrice, this.totalQuantity);

    // set itens da ordem de compra
    const orderItems: OrderItem[] = this.cartService.cartItems.map(item => {
      return new OrderItem(item);
    });

    // set dados do cliente
    const customer: ICustomer = new Customer(
      this.checkoutFormGroup.controls['customer'].value,
    );

    // set endereço de entrega
    const billingCountry: Country = this.billingAddressCountry?.value;

    const billingAddress: IAddress = new Address(
      this.billingAddressStreet?.value,
      this.billingAddressCity?.value,
      this.billingStateAddress?.value,
      billingCountry.name,
      this.billingAddressZipCode?.value,
    );

    // set endereço de cobrança
    const shippingCountry: Country = this.shippingAddressCountry?.value;

    const shippingAddress: IAddress = new Address(
      this.shippingAddressStreet?.value,
      this.shippingAddressCity?.value,
      this.shippingStateAddress?.value,
      shippingCountry.name,
      this.shippingAddressZipCode?.value,
    );
    // set objeto compra
    const purchase: IPurchase = new Purchase(
      customer,
      billingAddress,
      shippingAddress,
      order,
      orderItems,
    );

    // console.log(JSON.stringify(purchase));
    // Envia dados para o service
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.error('Ocorreu um error', error.message()),
    });
  }

  reviewCartDetail() {
    this.cartService.totalQuantity.subscribe({
      next: (data: number) => {
        this.totalQuantity = data;
      },
    });

    this.cartService.totalPrice.subscribe({
      next: (data: number) => {
        this.totalPrice = data;
      },
    });
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const theChecked = (event.target as HTMLInputElement).checked;
    this.theChecked = theChecked;

    if (theChecked) {
      this.checkoutFormGroup.controls['billingAddress'].patchValue(
        this.checkoutFormGroup.controls['shippingAddress'].value,
      );
      this.billingAddressState = this.shippingAddressState;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.controls['creditCard'];
    const selectedYear = +creditCardFormGroup.value.expirationYear;
    let startMonth: number;

    if (selectedYear === new Date().getFullYear()) {
      startMonth = this.startMonth;
    } else {
      startMonth = 1;
    }
    this.getCreditCardMonths(startMonth);
  }

  getCreditCardMonths(startMonth: number) {
    this.luv2ShopService.getCreditCardMonths(startMonth).subscribe({
      next: (theMonths: number[]) => {
        this.creditCardMonths = theMonths;
      },
    });
  }

  getCreditCardYears() {
    this.luv2ShopService.getCreditCardYears().subscribe({
      next: (theYears: number[]) => {
        this.creditCardYears = theYears;
      },
    });
  }

  getCountries() {
    this.luv2ShopService.getCountries().subscribe({
      next: (theCountries: Country[]) => {
        this.countries = theCountries;
      },
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.controls[formGroupName];
    const countryCode = formGroup.value.country.code;
    // const countryName = formGroup.value.country.name;

    this.luv2ShopService.getStatesFromCountry(countryCode).subscribe({
      next: (theStates: State[]) => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressState = theStates;
        } else {
          this.billingAddressState = theStates;
        }
        formGroup.get('state')?.setValue(theStates[0].name);

        if (this.theChecked) {
          this.billingAddressState = theStates;
          this.checkoutFormGroup.controls['billingAddress'].patchValue(
            this.checkoutFormGroup.controls['shippingAddress'].value,
          );
        }
      },
    });
  }
}