import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{     
    submitMessage: string;
    username = new FormControl('', Validators.required);
    password = new FormControl('', [Validators.minLength(6),Validators.required]); 
    token:string;
    errlogin = '';
    constructor(private routeService: RouterService,private authService : AuthenticationService){
      this.submitMessage = '';
    }       
    loginSubmit(){
    this.authService.authenticateUser(
      {username: this.username.value,password: this.password.value}).subscribe
    (
      (res)=>
      {
        this.token = res['token'];
        console.log(this.token);
        this.authService.setBearerToken(this.token);
        this.routeService.routeToDashboard();
      },err => {
        this.submitMessage = err.message;
        if (err.status === 403) {
          this.submitMessage = 'Unauthorized';
        } else {
          
          this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
        }
      }  
    );
      }
}
