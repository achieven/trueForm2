import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestore } from '@angular/fire/firestore';

//firabase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { Routes, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table'
import { CdkTableModule} from '@angular/cdk/table';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { RegisterComponent } from './register/register.component';
import { ScoreComponent } from './score/score.component';
import { PicComponent } from './pic/pic.component';
import { QuizComponent } from './quiz/quiz.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    BooksComponent,
    BookComponent,
    RegisterComponent,
    ScoreComponent,
    PicComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatTableModule,
    CdkTableModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'quiz', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'score', component: ScoreComponent },
      { path: 'pic', component: PicComponent },
      { path: 'quiz', component: QuizComponent },
      { path: '**', redirectTo: 'quiz', pathMatch: 'full' }
    ])
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
