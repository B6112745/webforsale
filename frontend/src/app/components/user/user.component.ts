import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../services/games.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  gameForm = new FormGroup({    
    title: new FormControl('',[Validators.required]),
    genre: new FormControl('',[Validators.required]),    
    description: new FormControl('',[Validators.required]),
    publisher: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required])
  });

  gameType: string[] = ['222','Adventure','Sport','Fighting','RPG','Puzzle','FPS'];
  previewLoaded: boolean = false;

  constructor(private gs: GamesService) { }

  ngOnInit(): void {
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
