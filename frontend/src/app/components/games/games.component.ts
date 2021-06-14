import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any;
  show: boolean|any = false;

  constructor(private gs : GamesService, private cr : CartService) { 
    this.onLoading();
  }

  ngOnInit(): void {}

  onLoading(){
    try {
      this.gs.getgame().subscribe(
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
