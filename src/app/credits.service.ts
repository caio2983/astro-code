import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditsService {
  private http = inject(HttpClient);

  getUsers(): Observable<any[]> {
    console.log('get user service');
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  creditsTransaction(credits: string | number, id: number | string) {
    return this.http.get(`http://localhost:3000/credit/${credits}/${id}`);
  }

  getTransactions() {
    return this.http.get<any[]>('http://localhost:3000/transactions');
  }

  constructor() {}
}
