import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JSONInterceptor } from './JSONInterceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JSONInterceptor, multi: true },
];
