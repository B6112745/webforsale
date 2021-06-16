import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  product : HistoryService|any = [];
  pd : HistoryService|any = [];
  constructor(private http:HttpClient) { }

  getHistory(id:any,token:any){
    const headers = {'Authorization':token}
   return this.http.get<any>('http://localhost:3000/history/history/'+id,{headers})
   .pipe(map(data => {
     if (data) {
       this.product.push(data)
       console.log(data)
     }
     return data;
   }));
 }
 addHistory(token:any, id:any,product:any){
  const headers = {'Authorization':token}
  console.log('hello from add his')
  console.log(this.pd.gameid)
  console.log(product)
  console.log('game here')
  return this.http.post<any>('http://localhost:3000/history/addhistory/'+id,product)
  .pipe(map(data => {
    if (data) {
      //this.product.push(data)
      console.log(data)
    }
    return data;
  }));
 }
 addG(games:any){
   this.pd.push(games.id);
   console.log('game')
   console.log(games.id)
 }

}
