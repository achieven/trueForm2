import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  addBook(name:string, author:string){
    this.authService.user.subscribe(user =>{
      this.db.list('/users/'+user.uid+'/books').push({'bookName':name,'author':author, 'read':false});
    })
  }


  updateBook(key:string, name:string, author:string, read:boolean){
    this.authService.user.subscribe(user =>{
      this.db.list('/users/'+user.uid+'/books').update(key,{'bookName':name, 'author':author,'read':read});
    })
  }


  updateRead(key:string, read:boolean)
  {
    this.authService.user.subscribe(user =>{
      this.db.list('/users/'+user.uid+'/books').update(key,{'read':read});
    })
    
  }
  constructor(private authService: AuthService, private db: AngularFireDatabase) { }
}
