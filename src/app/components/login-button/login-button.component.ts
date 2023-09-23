import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {
  storage: Storage = sessionStorage;
  readonly authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.getUserDetail();
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
}
