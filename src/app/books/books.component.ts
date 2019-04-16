import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { BooksService } from '../books.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  nickname;
  user =[];
  books = [];

  bookName = '';
  author = '';
  read:boolean;


  addBook(){
    this.bookService.addBook(this.bookName, this.author);
    this.bookName = '';
    this.author = '';    
  }

  constructor(public authService: AuthService, private db:AngularFireDatabase, private bookService: BooksService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.db.list(user.uid+'/details').snapshotChanges().subscribe(
        details => {
          details.forEach(
                detail => {
                  let y = detail.payload.toJSON();
                  this.user.push(y);            
                   this.nickname = this.user[0].nickname;         
            }
          )
          
         
        }
      )
      this.db.list(user.uid+'/books').snapshotChanges().subscribe(
        books => {
          this.books = [];
          books.forEach(
            book => {
              let b = book.payload.toJSON();
              b['key'] = book.key;
              this.books.push(b);
              console.log(this.books); 
            }

          )
        }
      )
      
        
      }
     
    )
    
  }
}
