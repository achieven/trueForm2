import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import  { AngularFireDatabase } from '@angular/fire/database';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

export interface Score { score: number; user: string, timestamp: Date, quizName: string }

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  private scores: Array<Score>;
  private scoresCollection: AngularFirestoreCollection<Score>;

  toQuiz()
  {
    this.router.navigate(['/quiz']);
  }



  constructor(db: AngularFirestore, db2: AngularFireDatabase, private router: Router, public authService: AuthService) {
    this.scoresCollection = db.collection('scores',ref => ref.orderBy('score', 'desc'));
  }


  ngOnInit() {
    this.getScores().subscribe((res) => {
      this.scores = res;
    });
  }

  getScores() {
    return this.scoresCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

}
