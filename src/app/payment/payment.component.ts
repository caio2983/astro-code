import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreditsService } from '../credits.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-payment',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  users$!: any;
  user0!: any;
  transactions!: any[];
  selectedUser!: string;

  constructor(private credits: CreditsService) {}

  ngOnInit() {
    this.getUsers();
  }

  showSelected() {
    console.log(this.selectedUser);
  }

  getUsers() {
    this.credits.getUsers().subscribe((users) => {
      users = users.filter((element) => element.name !== 'User 0');
      this.user0 = users[0];
      this.users$ = users;

      console.log(this.users$);
    });
  }
}
