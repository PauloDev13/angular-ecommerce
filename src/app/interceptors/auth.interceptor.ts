import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly baseUrl = environment.baseUrl;
  private readonly oidcSecurityService = inject(OidcSecurityService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const secureEndpoints = [`${this.baseUrl}/orders`];

    this.oidcSecurityService.getAccessToken().subscribe({
      next: token => {
        if (
          secureEndpoints.some(url => request.urlWithParams.includes(url)) &&
          token
        ) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      },
    });
    return next.handle(request);
  }
}
