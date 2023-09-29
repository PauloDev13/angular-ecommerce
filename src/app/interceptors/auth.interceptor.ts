import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string | undefined = '';
  private readonly oidcSecurityService: OidcSecurityService =
    inject(OidcSecurityService);
  // private readonly authService: AuthService = inject(AuthService);
  // private readonly authOkta: OktaAuthStateService =
  //   inject(OktaAuthStateService);

  // private readonly authState: AuthModule = inject(AuthModule);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.oidcSecurityService.getAccessToken().subscribe({
      next: data => {
        this.token = data;
        console.log('token', this.token);
      },
    });
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<unknown>, next: HttpHandler) {
    const secureEndpoints = ['http://localhost:8080/api/orders'];

    if (secureEndpoints.some(url => request.urlWithParams.includes(url))) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.token}`,
        },
      });
      console.log(request.headers);
    }
    return await lastValueFrom(next.handle(request));
  }
}
