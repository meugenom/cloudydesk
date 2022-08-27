import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { PersistanceService } from "../services/persistance.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	constructor(
		private persistanceService: PersistanceService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const localStorageToken = this.persistanceService.getToken('auth');
		const authReq = !!localStorageToken ? req.clone({
			setHeaders: { 
				Authorization: 'Bearer ' + localStorageToken.accessToken
		},
		}) : req;
		return next.handle(authReq).pipe(
			catchError((error: HttpErrorResponse) => {
				switch (error.status) {
					case 400:
						alert('incorrect username or password / 400 error')
						break;
					case 401:
						alert('401 error')
						break;
					default:
				}
				return throwError(error);
			})
		)
	}
}