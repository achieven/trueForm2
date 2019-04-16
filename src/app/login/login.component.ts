import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password='';
  email='';
  
  hide = true;
  require = true;
  required = '';
  
  pbText: string;
  item1 = false;
  item2 = false;
  item3 = false;
  eyes = false;
  code = '';
  message = '';
 
  

  showEyes()
  {
    this.eyes = false;
  }

  hideEyes()
  {
    this.eyes = true;
  } 


  login()
  {
    this.require = true;
    if(this.email == '' || this.password == '')
    {
      this.required = "this input is required";
      this.require = false;
    }
    if (this.require)
    {
      this.authService.login(this.email,this.password)
      .then(value =>
      {
        this.router.navigate(['/']);
      })
      .catch(err =>
      {
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


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

}
