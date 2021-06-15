import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'
import { CartService } from '../../services/cart.service'
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any;
  token: any
  show: boolean|any = false;

  constructor(public local: LocalStorageService,private gs : GamesService, private cr : CartService) { 
    this.onLoading();
  }

  ngOnInit(): void {}

  onLoading(){
    try {
      this.token = this.local.get('user').token
      this.gs.getgame(this.token).subscribe(
        data => {
          this.games = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

  onClick(){
    this.show =!this.show
  }

  addToCart(id:number){
    
    return this.cr.addG(id)
  }
}
