import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../../services/equipments.service'
import {CartService } from '../../services/cart.service'


@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  cart: EquipmentsService | any = []

  equipments: any;

  constructor(private es : EquipmentsService, private cr : CartService) { 
    this.cart = this.cr.getCart();
    this.onLoading();
  }

  ngOnInit(): void { }
  onLoading(){
    try {
      this.es.getEquipment().subscribe(
        data => {
          this.equipments = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

  addToCart(id:number){
    
    return this.cr.add(id)
  }

}
