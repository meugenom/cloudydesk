import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
//import { PersistanceService } from "../services/persistance.service";
//import { CookieService } from "ngx-cookie-service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	constructor(
		//private persistanceService: PersistanceService,
		//private cookieService: CookieService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//const localStorageToken = this.persistanceService.getToken('auth');
		const localStorageToken = localStorage.getItem('jwt');
		//const jwtToken = this.cookieService.get('jwt');
		const authReq = !!localStorageToken ? req.clone({
			setHeaders: { 
				//'Content-Type': 'application/json',
				//Authorization: 'Bearer ' + localStorageToken,
				//'Cookie': 'jwt=' + (jwtToken!=''?jwtToken:'') + ''
		},
			withCredentials: true
		}) : req;
		return next.handle(authReq).pipe(
			catchError((error: HttpErrorResponse) => {
				switch (error.status) {
					case 400:
						//alert('incorrect username or password / 400 error')
						break;
					case 401:
						//alert('401 error')
						break;
					case 403:
						//alert('Incorrect username or password / 403 error')
						break;
					default:
				}
				return throwError(error);
			})
		)
	}
}