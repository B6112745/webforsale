import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { DevicesService } from '../../services/devices.service'
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  cart: DevicesService | any = []

  devices: any;
  token: any;
  constructor(public local: LocalStorageService,private ds : DevicesService, private cr : CartService) { 
    this.cart = this.cr.getCart();
    this.onLoading();
  }
    
  ngOnInit(): void {}

  onLoading(){
    try {
      this.token = this.local.get('user').token
      this.ds.getDevice(this.token).subscribe(
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
