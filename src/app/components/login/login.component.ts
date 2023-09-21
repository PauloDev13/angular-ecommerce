import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import * as OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  oktaSignIn: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignIn = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      // authParams: {
      //   pkce: true,
      //   issuer: myAppConfig.oidc.issuer,
      //   scopes: myAppConfig.oidc.scopes,
      // },
    });
  }

  ngOnInit() {
    this.getLogin();
  }

  getLogin() {
    this.oktaSignIn.renderEl(
      {
        el: '#okta-sign-in-widget',
      },
      async (response: any) => {
        if (response.status === 'SUCCESS') {
          await this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      },
    );
  }

  ngOnDestroy() {
    this.oktaSignIn.remove();
  }
}
