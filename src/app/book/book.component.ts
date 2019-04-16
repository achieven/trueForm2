import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() data:any;

  bookName = '';
  author = '';
  key = '';
  read:boolean;

  showTheAuthor = false;
  deleteBut = false;

  tempName = '';
  tempAuthor = '';
  showEditField = false;


  showEdit()
  {
    this.tempName = this.bookName;
    this.tempAuthor = this.author;
    this.showEditField = true;
  }

  save()
  {
    this.booksService.updateBook(this.key,this.bookName, this.author, this.read);
    this.showEditField = false;
  }
  cancel()
  {
    this.bookName = this.tempName;
    this.author = this.tempAuthor;
    this.showEditField = false;
    this.showTheAuthor = false;
  }

  checkChange()
  {
    this.booksService.updateRead(this.key,this.read);
  }

  showButton()
  {
    this.showTheAuthor = true;
  }

  hideButton()
  {
    this.showTheAuthor = false;
  }

  show2Buttons()
  {
    this.deleteBut = true;
  }

  


  constructor(private booksService:BooksService) { }

  ngOnInit() {

    this.bookName = this.data.bookName;
    this.author = this.data.author;
    this.read = this.data.read;
    this.key = this.data.key;
  }

}
