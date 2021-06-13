import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games: any;

  constructor(private http: HttpClient) { }

  addGame(game : any){
    return this.http.post<any>('http://localhost:3000/games/add', game)
    .pipe(map(data => {
      return data;
    }));
  }

  getgame(){
    return this.http.get<any>('http://localhost:3000/games/get')
    .pipe(map(data => {
      if (data) {
        this.games = data;
        console.log(this.games);
      }
      return this.games;
    }));
  }

}
