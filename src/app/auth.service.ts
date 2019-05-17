import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(email:string, password:string)
  {
    return this.fireBaseAuth
              .auth
              .createUserWithEmailAndPassword(email, password);
  }

  updateProfile(user, name:string)
  {
    user.updateProfile({displayName:name, photoURL:''});
  }

  login(email:string, password:string)
  {
    return this.
          fireBaseAuth.
          auth.
          signInWithEmailAndPassword(email,password);
  }

  logout()
  {
    return this
          .fireBaseAuth
          .auth
          .signOut();
  }
  addUser(user, nickname:string)
  {
    let uid = user.uid;
    let ref = this.db.database.ref('/');
    ref.child('users').push({'nickname':nickname});
  }

  getUser() {
    return this.fireBaseAuth.auth.currentUser;
  }

  user: Observable<firebase.User>;
  
  constructor(private fireBaseAuth: AngularFireAuth, 
              private db:AngularFireDatabase) 
  {
    this.user = fireBaseAuth.authState;
  }
}
