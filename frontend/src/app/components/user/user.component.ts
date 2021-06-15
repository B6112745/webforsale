import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 udata: any;
 token: any;

  constructor( private local: LocalStorageService, private ud: UserService) { 
    this.onLoading(this.ud);
  }

  ngOnInit(): void {
  }

  onLoading(id: any){
    try {
      this.token = this.local.get('user').token
      this.ud.getUser(this.token,id).subscribe(
        data => {
          this.udata = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

}
