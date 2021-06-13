import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  equipments : any;

  constructor(private http: HttpClient) { }

  addEquipment(equipment : any){
    return this.http.post<any>('http://localhost:3000/equipments/add', equipment)
    .pipe(map(data => {
      return data;
    }));
  }

  getEquipment(){
    return this.http.get<any>('http://localhost:3000/equipments/get')
    .pipe(map(data => {
      if (data) {
        this.equipments = data;
        console.log(this.equipments);
      }
      return this.equipments;
    }));
  }

  getSomeEquipment(id:number){
    return this.equipments[id]
  }
}
