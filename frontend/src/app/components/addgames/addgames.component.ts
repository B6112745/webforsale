import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-addgames',
  templateUrl: './addgames.component.html',
  styleUrls: ['./addgames.component.css']
})
export class AddgamesComponent implements OnInit {

  gameForm = new FormGroup({    
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),    
    description: new FormControl('',[Validators.required]),    
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required])
  });

  gameType: string[] = ['Strategy','Adventure','Sport','Fighting','RPG','Puzzle','FPS'];

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
