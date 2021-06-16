import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  devices : any;

  constructor(private http: HttpClient) { }

  addDevice(device : any,token: any){
    const headers = {'Authorization': token}
    return this.http.post<any>('http://localhost:3000/product/insertdevice', device,{headers})
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

  delDevice(token: any,id :any){
    console.log(id)
    const headers = {'Authorization': token}
    return this.http.delete<any>('http://localhost:3000/product/deletedevice/'+id,{headers})
  }

  getSomeDevices(id:number){
    return this.devices[id]
  }
  
getdevicebytype(token: any, type: any){
  const headers = {'Authorization': token}
  return this.http.get<any>('http://localhost:3000/product/getdevice/'+type,{headers})
  .pipe(map(data => {
    if (data) {
    
      console.log(data);
    }
    return data;
  }));
}

  deletedeviceid(token: any,customerid:any,deviceid :any){
    console.log(deviceid)
    console.log(customerid)
    const headers = {'Authorization': token}
    return this.http.delete<any>('http://localhost:3000/carts/deletefromcart/'+customerid+'/'+deviceid,{headers})
  }
}
