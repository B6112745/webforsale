import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-addgames',
  templateUrl: './addgames.component.html',
  styleUrls: ['./addgames.component.css']
})
export class AddgamesComponent implements OnInit {

  gameForm = new FormGroup({    
    title: new FormControl('',[Validators.required, Validators.pattern('^[ก-๙0-9a-zA-Z.\\s]+$')]),
    genre: new FormControl('',[Validators.required]),    
    description: new FormControl('',[Validators.required]),
    publisher: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required])
  });

  gameType: string[] = ['Strategy','Adventure','Sport','Fighting','RPG','Puzzle','FPS'];

  get title() {return this.gameForm.get('title') as FormArray;}
  get description() {return this.gameForm.get('description') as FormArray;}
  get publisher() {return this.gameForm.get('publisher') as FormArray;}
  get price() {return this.gameForm.get('price') as FormArray;}

  previewLoaded: boolean = false;

  constructor(private gs: GamesService) { }

  ngOnInit(): void {
  }

  addGame(){
    this.gs.addGame(this.gameForm.value).subscribe(
      data => {
        console.log(data)
        alert('Game added successfully');
        this.gameForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeImg(e : any){
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.gameForm.patchValue({
            img: reader.result
          })
      }
    }
  }
  resetFrom() {
  this.gameForm.reset();
  this.previewLoaded = false;
  }

}
