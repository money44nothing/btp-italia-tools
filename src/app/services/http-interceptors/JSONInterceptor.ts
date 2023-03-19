import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// angular HttpInterceptor uses `any` so we gracefully accept this fact
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// dafi - from https://stackoverflow.com/a/49279951/10955903
@Injectable()
export class JSONInterceptor implements HttpInterceptor {
  // private utcDateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):?(\d{2}(?:\.\d*)?)?Z$/;
  private dateFormats = [
    // iso
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}.?\d*)?/
  ];

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.convertDates(event.body);
        }
      }));
  }

  private convertDates(object: any): void {
    if (object == null || !(object instanceof Object)) {
      return;
    }

    if (object instanceof Array) {
      for (const item of object) {
        this.convertDates(item);
      }
    }

    for (const key of Object.keys(object)) {
      const value = object[key];

      if (value instanceof Array) {
        for (const item of value) {
          this.convertDates(item);
        }
      }

      if (value instanceof Object) {
        this.convertDates(value);
      }

      if (typeof value === 'string' && this.hasDateFormat(value)) {
        object[key] = new Date(value);
      }
    }
  }

  private hasDateFormat(value: string): boolean {
    return this.dateFormats.some(format => format.test(value));
  }
}
