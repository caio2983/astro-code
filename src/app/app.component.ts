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

  constructor(private credits: CreditsService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.credits.getUsers();
  }

  creditsTransaction(credits: number | string, id: number | string) {
    this.credits.creditsTransaction(credits, id).subscribe((response) => {
      this.getUsers();
    });

    console.log('transaction test');
  }
}
