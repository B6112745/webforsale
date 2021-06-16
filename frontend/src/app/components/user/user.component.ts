import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userid: any;
 token: any;
 gameForm = new FormGroup({    
  username: new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z]+$')]),
  email: new FormControl('',[Validators.required,Validators.email]),
  phone: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}')]),
});
  constructor( private local: LocalStorageService, private ud: UserService,private router: Router) { 
    this.onLoading();
    
  }

  ngOnInit(): void {
  }
  get email(){
    return this.gameForm.get('email') as FormArray;
  }

  get username(){
    return this.gameForm.get('username') as FormArray;
  }

  get phone(){
    return this.gameForm.get('phone') as FormArray;
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
  updateprofile(){
  console.log(this.gameForm.value)
  try {
    this.token = this.local.get('user').token
    this.userid = this.local.get('user').result.id
    this.ud.updateUser(this.token,this.gameForm.value,this.userid).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/user'])
      },err => {
        console.log(err)
      });
  }catch (error){
    console.log(error)
  }
  window.location.reload();
  }
  updateprofiles(){
    this.gameForm.get('username')?.setValue(this.userid[0].username)
    this.gameForm.get('email')?.setValue(this.userid[0].email)
    this.gameForm.get('phone')?.setValue(this.userid[0].phone)
  }

}
