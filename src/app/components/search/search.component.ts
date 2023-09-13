import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private readonly router: Router = inject(Router);

  doSearch(value: string) {
    this.router.navigate(['search', value]);
  }
}
