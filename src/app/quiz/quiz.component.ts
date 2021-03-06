import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { AuthService } from '../auth.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AnswerDialogComponent } from './answer-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Score } from '../score/score.component';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NavService} from '../services/nav.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'before';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 20,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';


  scores: Array<Score>;
  private scoresCollection: AngularFirestoreCollection<Score>;

  constructor(private quizService: QuizService, private router: Router, db: AngularFirestore, private authService: AuthService, private dialog: MatDialog, private navService: NavService) {
    this.scoresCollection = db.collection('scores',ref => ref.orderBy('score', 'desc'));
  }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.getScores().subscribe((res) => {
      this.scores = res;
    });
    this.navService.getNavChangeEmitter().subscribe(value => {
      this.stop();
    });
  }

  toScores()
  {
    this.router.navigate(['/score']);
  }

  stop () {
    clearInterval(this.timer);
  }

  start () {
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.pager.index = 0;
      this.startTime = new Date();
      this.tick();
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration && 'quiz' === this.mode) {
      this.answer();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
      this.startTime = new Date();
      this.tick();
      this.timer = setInterval(() => { this.tick(); }, 1000);
    }
    if (index >= this.pager.count) {
      this.onSubmit();
    }
  }

  answer() {
    this.stop();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      isCorrect: this.isCorrect(this.quiz.questions[this.pager.index]),
      info: this.quiz.questions[this.pager.index].info
    };

    const dialogRef = this.dialog.open(AnswerDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.goTo(this.pager.index + 1);
    })
  }

  isCorrect(question: Question) : Boolean {
    return question.options.every(x => x.selected === x.isAnswer);
  };

  async onSubmit() {
    // Post your data to the server here. answers contains the questionId and the users' answer.
    this.mode = 'submitting';
    const score: number = this.quiz.questions.filter(question => this.isCorrect(question)).length;
    try {
      await this.scoresCollection.add({score: score, user:  this.authService.getUser().displayName, timestamp: new Date(), quizName: this.quizService.getAll().find(quiz => quiz.id === this.quizName).name});
      this.mode = 'result';
    } catch (err) {
      console.log(err);
    }
  }

  getScore() {
    return this.quiz.questions.map((question => {
      return this.isCorrect(question) ? 1 : 0;
    })).reduce((prev, elem) =>{
      return prev + elem;
    }, 0);
  }

  getScores() {
    return this.scoresCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        }).filter(data => {
          return data.user === this.authService.getUser().displayName;
        });
      })
    );
  }
}

