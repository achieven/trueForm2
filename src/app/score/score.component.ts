import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  toQuiz()
  {
    this.router.navigate(['/quiz']);
  }

  constructor(private router:Router, public authService: AuthService) { }

  ngOnInit() {
  }

}
