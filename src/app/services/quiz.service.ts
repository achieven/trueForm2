import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/celebs1.json', name: 'quiz 1' },
      { id: 'data/celebs2.json', name: 'quiz 2' },
      { id: 'data/celebs2.json', name: 'quiz 3' }
    ];
  }

}
