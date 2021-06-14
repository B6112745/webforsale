import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-updategames',
  templateUrl: './updategames.component.html',
  styleUrls: ['./updategames.component.css']
})
export class UpdategamesComponent implements OnInit {

  games: any;

  constructor(private gs : GamesService) {
    this.onLoading();
   }

  ngOnInit(): void {
  }

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

}
