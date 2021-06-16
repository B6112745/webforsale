import { Component, OnInit} from '@angular/core';
import { GamesService } from '../../services/games.service'
import { CartService } from '../../services/cart.service'
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
 
  games: any
  genre: any
  token: any
  userid: any
  show: boolean|any = false;

  constructor(public local: LocalStorageService,private gs : GamesService, private cr : CartService) { 
    if(this.local.get('genre') === null){
      this.local.set('genre',{genre: null})    }


   
    if(this.local.get('genre').genre != null && this.local.get('genre').genre != 'All'){
      this.genre = this.local.get('genre').genre
      console.log(this.genre)
      this.Loadgamegenre();
    }else{
      this.onLoading();
    }
 
    
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
  Loadgamegenre(){
    try {
      this.token = this.local.get('user').token
      this.gs.getgamebygenre(this.token,this.genre).subscribe(
        data => {
          this.games = data;
          this.local.remove('genre')
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
    console.log(games)
    try{
      this.token = this.local.get('user').token
      this.userid = this.local.get('user').result.id
      console.log(this.userid)
      this.cr.addG(games,this.token,this.userid,this.token).subscribe(
        data => {
          this.cr.counter = data.length
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
