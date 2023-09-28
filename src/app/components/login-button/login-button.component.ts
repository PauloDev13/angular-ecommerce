import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  storage: Storage = sessionStorage;
  isAuthenticated = false;

  readonly authService: AuthService = inject(AuthService);
  private readonly oidcSecurityService: OidcSecurityService =
    inject(OidcSecurityService);

  ngOnInit() {
    // this.getUserDetail();
    this.getIsAuthenticated();
  }

  getIsAuthenticated() {
    this.oidcSecurityService.isAuthenticated$.subscribe({
      next: ({ isAuthenticated }) => (this.isAuthenticated = isAuthenticated),
    });
  }

  getUserDetail() {
    let isAuthenticated = false;

    this.authService.isAuthenticated$
      .pipe(
        tap((res: boolean) => {
          isAuthenticated = res;
        }),
        switchMap(() =>
          this.authService.user$.pipe(
            tap(res => {
              if (isAuthenticated) {
                if (res?.email) {
                  this.storage.setItem('userEmail', res.email);
                }
              }
            }),
          ),
        ),
      )
      .subscribe();
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe({
      next: result => console.log(result),
    });
  }
}
