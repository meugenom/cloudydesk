import { PersistanceService } from './persistance.service';
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
        private persistanceService:PersistanceService
    ) { }

	//need check the server if token is saved on LocalStorage 
    isAuthenticated(): any{

        const localStorageToken = this.persistanceService.getToken("auth");
		
		
		if(!localStorageToken){
            return false;
        }
		
		return  true;
    }

	getLocalAuthInfo(){
		const res: any = {
			token: this.persistanceService.getToken("auth"),
			email: this.persistanceService.getToken("email")
		}
		return res;
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
    

    getSomething(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/api/getsomething`)
    }

	logout(signOutData: any) {
		return this.http.post(`${environment.apiUrl}/api/v1/auth/logout`, signOutData);
	
	}

    //signOut() {
    //    localStorage.clear();
		//need think about the logic
	//	console.log('Sign Out from service')
    	//this.router.navigate(['/login']);
    //}
}