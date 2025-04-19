import { Component, OnInit } from '@angular/core';
import { CreditsService } from '../credits.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [MatCardModule, NgFor],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactions!: any[];

  constructor(private credits: CreditsService) {}

  ngOnInit() {
    this.credits.getTransactions();
    this.credits.transactions$.subscribe((transactions: any) => {
      this.transactions = transactions;
    });
  }
}
