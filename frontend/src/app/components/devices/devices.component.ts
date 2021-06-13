import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { DevicesService } from '../../services/devices.service'

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  cart: DevicesService | any = []

  devices: any;

  constructor(private ds : DevicesService, private cr : CartService) { 
    this.cart = this.cr.getCart();
    this.onLoading();
  }
    
  ngOnInit(): void {}

  onLoading(){
    try {
      this.ds.getDevice().subscribe(
        data => {
          this.devices = data;
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
