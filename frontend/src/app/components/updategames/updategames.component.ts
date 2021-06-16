import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-updategames',
  templateUrl: './updategames.component.html',
  styleUrls: ['./updategames.component.css']
})
export class UpdategamesComponent implements OnInit {

  games: any;
  token: any
  constructor(public local: LocalStorageService,private gs : GamesService) {
    this.onLoading();
   }

   ngOnInit(): void {
  }

  

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

  delgame(id : any){
    console.log(id)
    try {
      this.token = this.local.get('user').token
      this.gs.deleteGame(this.token,id).subscribe(
        data => {
          this.games = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }

}
