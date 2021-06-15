import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminSignupService {

  users: any;

  constructor(private http: HttpClient, public local:LocalStorageService) { }

  signup(user : any){
    return this.http.post<any>('http://localhost:3000/admin/addadmins', user)
    .pipe(map(data => {
      return data;
    }));
  }


}
