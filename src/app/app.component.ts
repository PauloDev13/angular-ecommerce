import { Component, inject, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';

  private readonly oidcSecurityService: OidcSecurityService =
    inject(OidcSecurityService);

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe({
      next: loginResponse => {
        const { isAuthenticated, userData } = loginResponse;
        console.log('App is authenticated', isAuthenticated);
        console.log('User data', userData);
      },
    });
  }
}
