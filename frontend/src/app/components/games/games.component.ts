import { Component, OnInit} from '@angular/core';
import { GamesService } from '../../services/games.service'
import { CartService } from '../../services/cart.service'
import { LocalStorageService } from 'angular-web-storage'
import { LoginComponent } from '../login/login.component'
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: any;
  token: any
  userid: any
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

  addToCart(games: any){
    try{
      this.token = this.local.get('user').token
      this.userid = this.local.get('user').result.id
      console.log(this.userid)
      this.cr.addG(games,this.token,this.userid,this.token).subscribe(
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
