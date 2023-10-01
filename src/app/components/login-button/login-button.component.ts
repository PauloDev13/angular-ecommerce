import { Component, inject, OnInit } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  storage: Storage = sessionStorage;
  isAuthenticated = false;
  userEmail!: string;

  private readonly oidcSecurityService = inject(OidcSecurityService);

  ngOnInit() {
    this.getUserAuthenticated();
    this.getUserDetail();
  }

  getUserAuthenticated() {
    this.oidcSecurityService.isAuthenticated$.subscribe({
      next: ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
      },
    });
  }

  getUserDetail() {
    this.oidcSecurityService.userData$.subscribe({
      next: ({ userData }) => {
        if (this.isAuthenticated) {
          this.userEmail = userData.name;
          this.storage.setItem('userEmail', this.userEmail);
        }
      },
    });
  }

  // getUserDetail() {
  //   let isAuthenticated = false;
  //
  //   this.authService.isAuthenticated$
  //     .pipe(
  //       tap((res: boolean) => {
  //         isAuthenticated = res;
  //       }),
  //       switchMap(() =>
  //         this.authService.user$.pipe(
  //           tap(res => {
  //             if (isAuthenticated) {
  //               if (res?.email) {
  //                 this.storage.setItem('userEmail', res.email);
  //               }
  //             }
  //           }),
  //         ),
  //       ),
  //     )
  //     .subscribe();
  // }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    console.log('logout');
    this.oidcSecurityService.logoffAndRevokeTokens().subscribe();
    this.storage.clear();
  }
}
