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

  ngOnInit() {
    this.credits.getUsers();
    this.credits.users$.subscribe((users) => {
      console.log(users);
      this.users$ = users;
      const user0 = users.filter((user: any) => user.name === 'User 0');
      this.user0 = user0[0];
      console.log(this.user0);
    });
  }
}
