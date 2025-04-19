import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditsService {
  private http = inject(HttpClient);
  private users = new BehaviorSubject<any>([]);
  users$ = this.users.asObservable();

  private transactions = new BehaviorSubject<any>([]);
  transactions$ = this.transactions.asObservable();

  constructor() {}

  setUsers(users: any[]) {
    this.users.next(users);
  }

  getUsers(): void {
    this.http.get<any[]>('http://localhost:3000/users').subscribe((users) => {
      this.users.next(users);
    });
  }

  creditsTransaction(credits: string | number, id: number | string) {
    const creditsNum = Number(credits);
    const idNum = Number(id);
    console.log('teste creditss');
    console.log(`http://localhost:3000/credit/${creditsNum}/${idNum}`);
    return this.http.get<any[]>(
      `http://localhost:3000/credit/${creditsNum}/${idNum}`
    );
  }

  getTransactions() {
    this.http
      .get<any[]>('http://localhost:3000/transactions')
      .subscribe((transactions) => {
        console.log('transactions service', transactions);
        this.transactions.next(transactions);
      });
  }

  setTransactions(transactions: any) {
    this.transactions.next(transactions);
  }
}
