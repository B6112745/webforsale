import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { DevicesService } from '../../services/devices.service'
import { LocalStorageService } from 'angular-web-storage'
import { FormControl} from '@angular/forms'
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  cart: DevicesService | any = []
 quantity = new FormControl('');
  devices: any;
  token: any;
  userid: any;
  constructor(public local: LocalStorageService,private ds : DevicesService, private cr : CartService) { 
    this.cart = this.cr.getCarts();
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

  addToCart(item:any){
    
    try{
      console.log(this.quantity)
      this.token = this.local.get('user').token
      this.userid = this.local.get('user').result.id
      console.log(this.userid)
      this.cr.addG(item,this.token,this.userid,this.quantity.value).subscribe(
        data => {
          console.log(data)
        },err => {
          console.log(err)
        }
      )
     }catch (error){
      console.log(error)
     }
    
  }
 

}
