import { Component, OnInit,ViewChild } from '@angular/core';
import { DevicesService } from '../../services/devices.service'
import { CartService } from '../../services/cart.service'
import { LocalStorageService } from 'angular-web-storage';
import { GamesService} from '../../services/games.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  cart: DevicesService | any = []

  sumprice = 0
  userid: any
  token: any
  constructor(public local: LocalStorageService,private cr : CartService) { 
    this.userid = this.local.get('user').result.id
    this.token = this.local.get('user').token
   this.cr.getcart(this.userid,this.token).subscribe(
     data => {
  
      this.cart = this.cr.getCarts()
 
     },err => {
      console.log(err)
     }
   )
  
  }

  ngOnInit(): void {
  }
  
  getsumprice(){
    this.sumprice = 0
  for(let p in this.cart){
    var price
    price = this.cart[p].quantity*this.cart[p].price
    this.sumprice +=price
  }
  }

  getCounter(){
    return this.cr.getCounter()
  }
  getSumPrice(){
    return this.sumprice
  }
  setgenre(genre: any){
    this.local.set('genre',{genre:genre})
  }

}
