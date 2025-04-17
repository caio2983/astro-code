import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreditsService } from './credits.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'astro-code';

  users$!: Observable<any[]>;
  transactions!: any[];

  constructor(private credits: CreditsService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getTransactions() {
    this.credits.getTransactions().subscribe((data) => {
      this.transactions = data;
      console.log('dados recebidos:', data);
    });
  }

  getUsers() {
    this.users$ = this.credits.getUsers();
  }

  creditsTransaction(credits: number | string, id: number | string) {
    // .subscribe() reacts to the data's arrival
    this.credits.creditsTransaction(credits, id).subscribe((response) => {
      this.getUsers();
    });

    console.log('transaction test');
  }
}
