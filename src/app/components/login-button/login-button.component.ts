import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent {
  constructor(
    public authService: AuthService, // @Inject(DOCUMENT) private doc: Document,
  ) {}

  // login() {
  //   this.authService.loginWithRedirect();
  // }
  //
  // logout() {
  //   this.authService.logout({
  //     logoutParams: { returnTo: this.doc.location.origin },
  //   });
  // }
}
