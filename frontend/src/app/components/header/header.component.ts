import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../../services/devices.service'
import { CartService } from '../../services/cart.service'
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: DevicesService | any = []
  userid: any
  token: any
  constructor(public local: LocalStorageService,private cr : CartService) { 
    this.userid = this.local.get('user').result.id
    this.token = this.local.get('user').token
   this.cr.getcart(this.userid,this.token).subscribe(
     data => {
  
      this.cart = data
 
     },err => {
      console.log(err)
     }
   )
  }

  ngOnInit(): void {
  }

  
  getCounter(){
    return this.cr.getCounter()
  }
  getSumPrice(){
    return this.cr.getsumPrice()
  }

}
