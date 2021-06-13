import { Injectable } from '@angular/core';
import { EquipmentsService } from '../services/equipments.service'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: Number =0;
  sumPrice: Number =0;
  cart: EquipmentsService|any =[]

  constructor(private eq : EquipmentsService) { }

  add(id: number){
    console.log('Add euipment idt: '+id+' to cart');
    this.cart.push(this.eq.getSomeEquipment(id))
    this.sumPrice += this.eq.getSomeEquipment(id).price;
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
