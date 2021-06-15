import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  devices : any;

  constructor(private http: HttpClient) { }

  addDevice(device : any){
    return this.http.post<any>('http://localhost:3000/product/insertdevice', device)
    .pipe(map(data => {
      return data;
    }));
  }

  getDevice(token: any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/product/getdevice',{headers})
    .pipe(map(data => {
      if (data) {
        this.devices = data;
        console.log(this.devices);
      }
      return this.devices;
    }));
  }

  getSomeDevices(id:number){
    return this.devices[id]
  }
}
