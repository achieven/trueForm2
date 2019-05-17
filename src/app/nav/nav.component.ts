import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  
  toLogin() 
  {
    this.router.navigate(['/login']);
  }

  toRegister()
  {
    this.router.navigate(['/register']);
  }

  toScores()
  {
    this.router.navigate(['/score']);
  }

  toLogout()
  {
    this.authService.logout()
    .then(value => {
      this.router.navigate(['/']);
    });
   
  }

  constructor(private router:Router, public authService: AuthService) { }


  ngOnInit() {
  }

}
