import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
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

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly cartService: CartService = inject(CartService);
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

  // formGroup endereço entrega
  get country() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get street() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get city() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get state() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get zipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
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
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer.firstName')?.value);
    console.log(this.checkoutFormGroup.get('customer.lastName')?.value);
    console.log(this.checkoutFormGroup.get('customer.email')?.value);
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
