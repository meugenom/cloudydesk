import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root'
  })
  export class DirService {

	constructor (private http: HttpClient) { }
    /**
     *  
     * @param dirData 
     * @returns new directory created in the database
     */
    createDir(dirData: any){        
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(`${environment.apiUrl}/api/v1/dirs/dir`, dirData, {headers});
    };
    /**
     * 
     * @param dirData 
     * @returns true if directory was updated
     */
    updateDir(dirData: any){
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(`${environment.apiUrl}/api/v1/dirs/dir`, dirData, {headers});
    }
    /**
     * 
     * @param dirData 
     * @returns true if directory was deleted
     */
    deleteDir(dirData: any){
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.delete(`${environment.apiUrl}/api/v1/dirs/dir`, { headers, body: dirData });
    }
  };