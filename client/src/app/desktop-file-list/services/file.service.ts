import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
	providedIn: 'root'
  })
  export class FileService {
	constructor (private http: HttpClient) {}
  
	ls(userData: any){
		return this.http.get(`${environment.apiUrl}/api/v1/files/ls`, userData);
	};

	mv(fileData: any){
		return this.http.post(`${environment.apiUrl}/api/v1/files/mv`, fileData);
	};
    
  }