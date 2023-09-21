import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean | undefined = false;
  userFullName = '';

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
  ) {}

  ngOnInit() {
    this.oktaAuthService.authState$.subscribe({
      next: result => {
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      },
    });
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

  private getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuth.getUser().then(response => {
        this.userFullName = response.name as string;
      });
    }
  }
}
