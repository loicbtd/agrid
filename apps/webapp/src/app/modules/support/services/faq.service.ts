import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private httpClient: HttpClient) {}

  loadQuestions() {
    return this.httpClient.get<JSON>('assets/faq/questions.json');
  }
}
