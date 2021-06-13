import { Component, OnInit } from '@angular/core';
import { EquipmentsService } from '../../services/equipments.service'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cart: EquipmentsService | any = []

  constructor(private cr : CartService) { 
    this.cart = this.cr.getCart();
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
