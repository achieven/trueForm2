import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password = '';
  password2 = '';
  name:string;
  nickname:string;
  
  pbText: string;
  item1 = false;
  item2 = false;
  item3 = false;
  hide = true;
  hide2 = true;
  eyes = false;
  code = '';
  message = '';
  required = '';
  require = true;
  passCheck = true;
  passMes = '';
  

  showEyes()
  {
    this.eyes = false;
  }

  hideEyes()
  {
    this.eyes = true;
  } 

  signUp()
  {
  
    this.require = true;
    this.passCheck = true;
    
    if(this.password != this.password2)
    {
      this.passCheck = false;
      this.passMes = "the passwords don't match! try again please"
    }

    if (this.name == null || this.nickname == null || this.password == '' || this.password2 == ''|| this.email == null) 
    {
      this.required = "this input is required";
      this.require = false;
    }
     if (this.require && this.passCheck)
    {
      this.authService.register(this.email,this.password)
        .then(value => { 
              this.authService.updateProfile(value.user,this.name);
              this.authService.addUser(value.user, this.nickname); 
        }).then(value =>{
          this.router.navigate(['/']);
        }).catch(err => {
          this.code = err.code;
          this.message = err.message;
          console.log(err);
        })
    }
  }

  passwordLen(){
    let len = this.password.length;
   
    if (len === 0) 
    {
      this.pbText= 'Password is blank';
      
    } 
    else if (len > 0 && len <= 4) 
    {
      this.pbText = 'Too weak';
      this.item1 = true;
    } 
    else if (len > 4 && len <= 8) 
    {
      this.pbText = 'Could be stronger';
      this.item2 = true;
    } 
    else 
    {
      this.pbText = 'Strong password';
      this.item3 = true;
    } 
  }



  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

}
