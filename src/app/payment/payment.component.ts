import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreditsService } from '../credits.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-payment',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  users$!: any;
  transactions!: any[];
  selectedUser!: string;
  selectedValue!: string;
  readonly dialog = inject(MatDialog);

  constructor(private credits: CreditsService) {}
  ngOnInit() {
    this.credits.getUsers();
    this.credits.users$.subscribe((users) => {
      this.users$ = users.filter((user: any) => user.name !== 'User 0');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      // data: {name: this.name(), animal: this.animal()},
    });
  }

  creditsTransaction(credits: number | string, id: number | string) {
    this.credits.creditsTransaction(credits, id).subscribe({
      next: (res) => {
        if (!res) {
          // popup function here !!!!
          this.openDialog();
          console.log('no credits');
        } else {
          console.log('res payment', res);
          this.credits.getTransactions();
          this.credits.setUsers(res);
          console.log('Requisição feita com sucesso:', res);
        }
      },
      error: (err) => {
        console.error('Erro na requisição:', err);
      },
    });
  }
}
