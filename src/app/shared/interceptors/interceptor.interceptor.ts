import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const APIKey = 'sandb_iizLheGLJiVaJVEOMzXF97mutZTvh4V1Eb1LUxfq';
    return next.handle(request.clone({setHeaders: {'x-api-key': APIKey, 'Access-Control-Allow-Origin': '*'}}));
  }
}
