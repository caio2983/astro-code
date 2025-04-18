import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreditsService } from './credits.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserlistComponent } from './userlist/userlist.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-root',
  imports: [UserlistComponent, PaymentComponent, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
