import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userid: any;
 token: any;

  constructor( private local: LocalStorageService, private ud: UserService) { 
    this.onLoading();
  }

  ngOnInit(): void {
  }

  onLoading(){
    console.log("1111")
    try {
      this.token = this.local.get('user').token
      this.userid = this.local.get('user').result.id
      this.ud.getUser(this.token,this.userid).subscribe(
        data => {
          this.userid = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

}
