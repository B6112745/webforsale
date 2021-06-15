import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private auth: LoginService) { }

  ngOnInit(): void {
  }

  signin(){
    console.log(this.loginForm.value);
    this.auth.signIn(this.loginForm.value).subscribe(
      data => {
        if(data.status ==true){
          this.router.navigate(['/games'])
        }else{
          alert('Usernaem or password is incorrect!');
        }
      },
      err =>{
        console.log(err);
        alert('Usernaem or password is incorrect!');
      }
    );
  }

  signup(){
      this.router.navigate(['/signup'])
    }

}