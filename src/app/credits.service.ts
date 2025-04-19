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

  constructor() {}

  setUsers(users: any[]) {
    this.users.next(users);
  }

  getUsers(): void {
    console.log('get user service');
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
    return this.http.get<any[]>('http://localhost:3000/transactions');
  }
}
