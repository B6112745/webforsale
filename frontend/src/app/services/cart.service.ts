import { Injectable } from '@angular/core';
import { DevicesService } from '../services/devices.service'
import { GamesService } from '../services/games.service'
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: Number =0;
  sumPrice: Number =0;
  cart: DevicesService|GamesService |any = []

  constructor(private de : DevicesService,private ge : GamesService,private http: HttpClient) {
  
   }
  //  clear(uid:any){
  //    console.log(uid)
  //   return this.http.delete<any>('http://localhost:3000/carts/deleteallcart/'+uid)
  //   .pipe(map(data => {
  //     if (data) {
  //       //this.devices = data;
  //       console.log('this.devices');
  //     }
  //     return console.log('this.devices');
  //   }));
  //  }
  getcart(userid: any,token: any){
     const headers = {'Authorization':token}
    return this.http.get<any>('http://localhost:3000/carts/getcart/'+userid,{headers})
    .pipe(map(data => {
      if (data) {
        this.cart = data
        this.counter = data.length

      }
      return this.cart;
    }));
  }
  add(id: number){
    console.log('Add device idt: '+id+' to cart');
    this.cart.push(this.de.getSomeDevices(id))
    this.sumPrice += this.de.getSomeDevices(id).price;
    this.counter = this.cart.length
  }
 
  addG(games: any,token:any,userid:any,quantity:any){
    const headers = {'Authorization': token}
    return this.http.post<any>('http://localhost:3000/carts/addtocart/'+userid+'/'+quantity,games,{headers})
    .pipe(map(data => {
      if (data) {
        alert('Added to cart')
        this.cart.push(data)
     
        console.log(data);
      }
      return this.cart;
    }));
  }
 

  getCounter(){
    return this.counter;
  }

  

  getCarts(){
    return this.cart;
  }
}
