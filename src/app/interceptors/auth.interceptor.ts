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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string | undefined = '';
  private readonly oidcSecurityService = inject(OidcSecurityService);
  // private readonly authService: AuthService = inject(AuthService);
  // private readonly authState: AuthModule = inject(AuthModule);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const secureEndpoints = ['http://localhost:8080/api/orders'];

    this.oidcSecurityService.getAccessToken().subscribe({
      next: token => {
        if (secureEndpoints.some(url => request.urlWithParams.includes(url))) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      },
    });
    return next.handle(request);
    // return from(this.handleAccess(request, next));
  }

  // private async handleAccess(request: HttpRequest<unknown>, next: HttpHandler) {
  //   const secureEndpoints = ['http://localhost:8080/api/orders'];
  //
  //   if (secureEndpoints.some(url => request.urlWithParams.includes(url))) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     });
  //     console.log('TOKEN INTERCEPTOR', this.token);
  //   }
  //   return await lastValueFrom(next.handle(request));
  // }
}
