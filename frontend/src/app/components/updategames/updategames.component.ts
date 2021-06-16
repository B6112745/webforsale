import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service'
import { LocalStorageService } from 'angular-web-storage'
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-updategames',
  templateUrl: './updategames.component.html',
  styleUrls: ['./updategames.component.css']
})
export class UpdategamesComponent implements OnInit {
  previewLoaded: boolean = false;
  gameForm = new FormGroup({    
    title: new FormControl('',[Validators.required, Validators.pattern('^[ก-๙0-9a-zA-Z.\\s]+$')]),
    genre: new FormControl('',[Validators.required]),    
    description: new FormControl('',[Validators.required]),
    publisher: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
    id: new FormControl('')
  });
 
  games: any;
  token: any
  constructor(public local: LocalStorageService,private gs : GamesService) {
    this.onLoading();
   }

   ngOnInit(): void {
  }
  get title() {return this.gameForm.get('title') as FormArray;}
  get description() {return this.gameForm.get('description') as FormArray;}
  get publisher() {return this.gameForm.get('publisher') as FormArray;}
  get price() {return this.gameForm.get('price') as FormArray;}
  onChangeImg(e : any){
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.games.patchValue({
            img: reader.result
          })
      }
    }
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
  updategames(){
    this.gameForm.get('id')?.setValue(this.games[0].id)
    this.gameForm.get('title')?.setValue(this.games[0].title)
    this.gameForm.get('genre')?.setValue(this.games[0].genre)
    this.gameForm.get('description')?.setValue(this.games[0].description)
    this.gameForm.get('publisher')?.setValue(this.games[0].publisher)
    this.gameForm.get('price')?.setValue(this.games[0].price)
    
    console.log(this.gameForm.value)
  }
  updategame(){
    console.log(this.gameForm.value)
    try {
      this.token = this.local.get('user').token
      this.gs.updategame(this.token,this.gameForm.value).subscribe(
        data => {
         
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }

}
