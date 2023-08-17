import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root'
  })
  export class DirService {
	constructor (private http: HttpClient) {}
    /**
     * 
     * @param dirData 
     * @returns new directory created in the database
     */
    createDir(dirData: any){
        return this.http.post(`${environment.apiUrl}/api/v1/dirs/dir`, dirData);
    };
  }