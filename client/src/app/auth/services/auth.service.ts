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

    isAuthenticated(): boolean{
        const localStorageToken = this.persistanceService.getToken('auth');
        if(!localStorageToken){
            return false
        }
        return true
    }

    login(loginData: any) {
	return this.http.post(`${environment.apiUrl}/auth/login`, loginData);

    }

	signIn(signInData: any) {
        return this.http.post(`${environment.apiUrl}/auth/register`, signInData)
    }
    

    getSomething(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/api/getsomething`)
    }
    
    signOut() {
        localStorage.clear();
		//need think about the logic
    	//this.router.navigate(['/login']);
    }
}