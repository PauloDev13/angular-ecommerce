import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

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
  private readonly luv2ShopService: Luv2ShopFormService =
    inject(Luv2ShopFormService);

  ngOnInit() {
    this.getCreditCardYears();
    this.getCreditCardMonths(this.startMonth);
    this.getCountries();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  onSubmit() {
    console.log('Submit');
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
    console.log(this.checkoutFormGroup.get('billingAddress')?.value);
    console.log(this.checkoutFormGroup.get('creditCard')?.value);
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
