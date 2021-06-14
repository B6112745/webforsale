import { Injectable } from '@angular/core';
import { DevicesService } from '../services/devices.service'
import { GamesService } from '../services/games.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: Number =0;
  sumPrice: Number =0;
  cart: DevicesService|GamesService |any =[]

  constructor(private de : DevicesService,private ge : GamesService) { }

  add(id: number){
    console.log('Add device idt: '+id+' to cart');
    this.cart.push(this.de.getSomeDevices(id))
    this.sumPrice += this.de.getSomeDevices(id).price;
    this.counter = this.cart.length
  }
  addG(id: number){
    console.log('Add game idt: '+id+' to cart');
    this.cart.push(this.ge.getSomeDevices(id))
    this.sumPrice += this.ge.getSomeDevices(id).price;
    this.counter = this.cart.length
  }

  getCounter(){
    return this.counter;
  }

  getsumPrice(){
    return this.sumPrice;
  }

  getCart(){
    return this.cart;
  }
}
