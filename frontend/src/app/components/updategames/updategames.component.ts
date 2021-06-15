import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updategames',
  templateUrl: './updategames.component.html',
  styleUrls: ['./updategames.component.css']
})
export class UpdategamesComponent implements OnInit {

  games: any;

  constructor(private gs : GamesService, private httpClient:HttpClient) {
    this.onLoading();
   }

  ngOnInit() {this.httpClient.delete('http://localhost:3000/product/getgame')
  .subscribe(() => 'Delete successful');
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
