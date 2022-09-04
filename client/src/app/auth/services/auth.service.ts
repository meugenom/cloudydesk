import { PersistanceService } from './persistance.service';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User} from '../store/models/user.model';


@Injectable({providedIn: 'root'})
export class AuthService {


  	private headers = new Headers({'Content-Type': 'application/json'});

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
			userName: this.persistanceService.getToken("name")
		}
		return res;
	}

    login(loginData: any) {
	return this.http.post(`${environment.apiUrl}/api/login`, loginData);

    }

	register(registerData: any) {
        return this.http.post(`${environment.apiUrl}/api/register`, registerData)
    }

	checkUser(checkUserData: any){	
        //return this.http.post(`${environment.apiUrl}/auth/user`, checkUserData)
		return this.http.get(`${environment.apiUrl}/api/whoami`, checkUserData);
    }

	ls(): Observable<any>{
		return this.http.get(`${environment.apiUrl}/api/ls`);
	}
    

    getSomething(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/api/getsomething`)
    }

    //signOut() {
    //    localStorage.clear();
		//need think about the logic
	//	console.log('Sign Out from service')
    	//this.router.navigate(['/login']);
    //}
}