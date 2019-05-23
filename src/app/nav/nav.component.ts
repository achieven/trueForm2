import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router, public authService: AuthService, private navService: NavService) { }


  ngOnInit() {
  }

  emitNavChange() {
    this.navService.emitNavChangeEvent(true);
  }

  toLogin() 
  {
    this.emitNavChange();
    this.router.navigate(['/login']);
  }

  toRegister()
  {
    this.emitNavChange();
    this.router.navigate(['/register']);
  }

  toScores()
  {
    this.emitNavChange();
    this.router.navigate(['/score']);
  }

  toQuiz()
  {
    this.emitNavChange();
    this.router.navigate(['/quiz']);
  }

  toLogout()
  {
    this.emitNavChange();
    this.authService.logout()
    .then(value => {
      this.router.navigate(['/']);
    });
   
  }

}
