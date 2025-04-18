import { Component, OnInit } from '@angular/core';
import { CreditsService } from '../credits.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-userlist',
  imports: [RouterOutlet, NgFor, AsyncPipe, MatCardModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css',
})
export class UserlistComponent {
  title = 'astro-code';

  users$!: any;
  user0!: any;
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
    this.credits.getUsers().subscribe((users) => {
      users = users.filter((element) => element.name !== 'User 0');
      this.user0 = users[0];
      this.users$ = users;

      console.log('userssss ?????', this.users$);
      console.log('user 0 ???', users[0]);
    });

    console.log(this.users$);
  }

  creditsTransaction(credits: number | string, id: number | string) {
    // .subscribe() reacts to the data's arrival
    this.credits.creditsTransaction(credits, id);

    console.log('transaction test');
  }
}
