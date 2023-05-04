import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User} from '../store/models/user.model';


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

	//need check the server if token is saved on LocalStorage 
    isAuthenticated(): any{
		return  true;
    }
	
    login(loginData: any) {
		return this.http.post(`${environment.apiUrl}/api/v1/auth/authenticate`, loginData);
    }

	register(registerData: any) {
        return this.http.post(`${environment.apiUrl}/api/v1/auth/register`, registerData)
    }

	checkUser(){
		return this.http.get(`${environment.apiUrl}/api/v1/users/whoami`);
    }
    
	/* observe the response type  see register component*/
	/*
    getSomething(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/api/getsomething`)
    }
	*/

	logout(signOutData: any) {
		return this.http.post(`${environment.apiUrl}/api/v1/auth/logout`, signOutData);
	
	}
}