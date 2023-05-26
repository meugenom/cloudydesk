import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from  '../user/model/user';


@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

	//need check the server if token is saved on LocalStorage 
    isAuthenticated(): boolean{
		return  true;
    }

    authenticate(user: User) {
        return this.http.post(`${environment.apiUrl}/api/v1/auth/authenticate`, user);
    }

    //regirster new user
	register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/v1/auth/register`, user)
    }

    //get User Info when JWT token exists, or returns error
	checkUser() {
		return this.http.get(`${environment.apiUrl}/api/v1/users/user`);
    }

    //delete some user
    deleteUser(user : User) {
        return this.http.delete(`${environment.apiUrl}/api/v1/users/user`,
            {body: user});
    }

    //update existed user
    editUser(user : User) {
        return this.http.put(`${environment.apiUrl}/api/v/1/users/user`,
            {body: user});
    }
    
	/* observe the response type  see register component*/
	/*
    getSomething(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/api/getsomething`)
    }
	*/

	logout(logoutData: any) {
		return this.http.post(`${environment.apiUrl}/api/v1/auth/logout`, logoutData);
	
	}
}