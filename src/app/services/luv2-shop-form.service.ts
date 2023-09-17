import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Country } from '../common/country';
import { State } from '../common/state';

interface IGetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface IGetResponseStates {
  _embedded: {
    states: State[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  baseUrl = 'http://localhost:8080/api';
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
      .get<IGetResponseCountries>(`${this.baseUrl}/countries`)
      .pipe(map(data => (this.countries = data._embedded.countries)));
  }

  getStatesFromCountry(code: string): Observable<State[]> {
    return this.httpClient
      .get<IGetResponseStates>(
        `${this.baseUrl}/states/search/findByCountryCode?code=${code}`,
      )
      .pipe(map(data => (this.states = data._embedded.states)));
  }
}
