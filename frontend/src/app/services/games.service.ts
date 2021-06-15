import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games: any;

  constructor(private http: HttpClient) { }

  addGame(game : any,token: any){
    const headers = {'Authorization': token}
    return this.http.post<any>('http://localhost:3000/product/insertgame', game,{headers})
    .pipe(map(data => {
      return data;
    }));
  }

  getgame(token: any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/product/getgame',{headers})
    .pipe(map(data => {
      if (data) {
        this.games = data;
        console.log(this.games);
      }
      return this.games;
    }));
  }

  deleteGame(token: any,id :any){
    console.log(id)
    const headers = {'Authorization': token}
    return this.http.delete<any>('http://localhost:3000/product/deletegame/'+id,{headers})
  }


  getSomeDevices(id:number){
    return this.games[id]
  }

}
