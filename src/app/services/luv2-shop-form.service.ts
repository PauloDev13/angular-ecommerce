import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { Country } from '../common/country';
import {
  IGetResponseCountries,
  IGetResponseStates,
} from '../common/interfaces/interfaces';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  urlCountry = `${environment.baseUrl}/countries`;
  urlState = `${environment.baseUrl}/states`;
  countries: Country[] = [];
  states: State[] = [];
  private readonly httpClient: HttpClient = inject(HttpClient);

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    const data: number[] = [];
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<IGetResponseCountries>(this.urlCountry)
      .pipe(map(data => (this.countries = data._embedded.countries)));
  }

  getStatesFromCountry(code: string): Observable<State[]> {
    return this.httpClient
      .get<IGetResponseStates>(
        `${this.urlState}/search/findByCountryCode?code=${code}`,
      )
      .pipe(map(data => (this.states = data._embedded.states)));
  }
}
